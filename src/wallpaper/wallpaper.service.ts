import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateWallpaperDto } from './dto/create-wallpaper.dto';
import { UpdateWallpaperDto } from './dto/update-wallpaper.dto';
import { Wallpaper } from './entities/wallpaper.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Tags } from 'src/tags/entities/tags.entity';
import { Files } from 'src/files/entities/files.entity';
import { WallpaperLives } from 'src/wallpaperlives/entities/wallpaperlives.entity';
import { WallpaperTags } from 'src/wallpapertags/entities/wallpapertags.entity';

@Injectable()
export class WallpaperService {
  constructor(
    @InjectRepository(Wallpaper)
    private readonly wallpaperRepository: Repository<Wallpaper>,
    @InjectRepository(Tags)
    private readonly tagRepo: Repository<Tags>,

    @InjectRepository(Files)
    private readonly fileRepo: Repository<Files>,

    @InjectRepository(WallpaperLives)
    private readonly wallpaperLivesRepo: Repository<WallpaperLives>,

    @InjectRepository(WallpaperTags)
    private readonly wallpaperTagsRepo: Repository<WallpaperTags>,
  ) {}

  async init() {
    const fs = require('fs');
    const data = await fs.readFileSync(
      '/Users/macos/project/private/wallpapers/list-wallpapers.json',
    );
    const wallpapers = JSON.parse(data);
    const listTag = await this.tagRepo.find();

    const chunkSize = 4; // Số lượng tác vụ đồng thời
    for (let i = 0; i < wallpapers.length; i += chunkSize) {
      const chunk = wallpapers.slice(i, i + chunkSize);

      // Tạo các promise cho mỗi wallpaper trong chunk
      const promises = chunk.map(async (wallpaper, index) => {
        console.log(`--- Handle ${i + index + 1}/${wallpapers.length} ---`);
        const data = {
          resourceId: wallpaper.resourceId,
          imageId: null,
          thumbnailId: null,
        };

        // Xử lý hình ảnh
        if (wallpaper.image) {
          const dataImg = {
            filePath: wallpaper.image.filePath,
            width: wallpaper.image.width,
            height: wallpaper.image.height,
            hash: wallpaper.image.hash,
            ext: wallpaper.image.ext,
            mime: wallpaper.image.mime,
            size: wallpaper.image.size,
          };

          const saveImage = await this.fileRepo.save(dataImg as any);
          if (saveImage) data.imageId = saveImage.id;
        }

        // Xử lý thumbnail
        if (wallpaper.thumbnail) {
          const dataThumb = {
            filePath: wallpaper.thumbnail.filePath,
            width: wallpaper.thumbnail.width,
            height: wallpaper.thumbnail.height,
            hash: wallpaper.thumbnail.hash,
            ext: wallpaper.thumbnail.ext,
            mime: wallpaper.thumbnail.mime,
            size: wallpaper.thumbnail.size,
          };

          const saveThumb = await this.fileRepo.save(dataThumb as any);
          if (saveThumb) data.thumbnailId = saveThumb.id;
        }

        const wallpaperCreate = await this.wallpaperRepository.save(
          data as any,
        );

        if (wallpaperCreate) {
          // Xử lý tags
          const tags = wallpaper.tags;
          if (tags.length > 0) {
            const tagPromises = tags.map(async (tag) => {
              const tagByResource = listTag.find(
                (item) => +item.resourceId === +tag.resourceId,
              );

              if (tagByResource) {
                await this.wallpaperTagsRepo.save({
                  wallpaperId: wallpaperCreate.id,
                  tagId: tagByResource.id,
                });
              }
            });
            await Promise.all(tagPromises); // Chờ tất cả tags được xử lý
          }

          // Xử lý lives
          const lives = wallpaper.lives;
          const livePromises = lives.map(async (live) => {
            const dataLive = {
              filePath: live.filePath,
              previewPath: live.previewPath,
              previewAnimation: live.previewAnimation,
            };

            const saveLive = await this.fileRepo.save(dataLive as any);
            const wallpaperLive = {
              fileId: saveLive.id,
              wallpaperId: wallpaperCreate.id,
            };

            await this.wallpaperLivesRepo.save(wallpaperLive);
          });
          await Promise.all(livePromises); // Chờ tất cả lives được xử lý
        }
      });

      // Chờ tất cả các tác vụ trong chunk hoàn thành
      await Promise.all(promises);
    }

    return true;
  }

  async create(createWallpaperDto: CreateWallpaperDto): Promise<Wallpaper> {
    const wallpaper = this.wallpaperRepository.create(createWallpaperDto);
    return this.wallpaperRepository.save(wallpaper);
  }

  async findAll(options: IPaginationOptions, query: any) {
    const queryBuilder: SelectQueryBuilder<Wallpaper> = this.wallpaperRepository
      .createQueryBuilder('wallpaper')
      .leftJoinAndSelect('wallpaper.image', 'image')
      .leftJoinAndSelect('wallpaper.thumbnail', 'thumbnail')
      .orderBy('wallpaper.id', 'DESC');

    if (query.tagId) {
      queryBuilder.where(
        `EXISTS (
          SELECT 1 FROM wallpaper_tags wt
          WHERE wt.wallpaper_id = wallpaper.id AND wt.tag_id = :tagId
        )`,
        { tagId: query.tagId },
      );
    }

    if (query.tag) {
      queryBuilder.where(
        `EXISTS (
          SELECT 1 FROM wallpaper_tags wt
          INNER JOIN tags t ON wt.tag_id = t.id
          WHERE wt.wallpaper_id = wallpaper.id AND t.slug = :tag
        )`,
        { tag: query.tag },
      );
    }

    return paginate<Wallpaper>(queryBuilder, options);
  }

  async findOne(id: string): Promise<Wallpaper> {
    return this.wallpaperRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateWallpaperDto: UpdateWallpaperDto,
  ): Promise<Wallpaper> {
    await this.wallpaperRepository.update(id, updateWallpaperDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.wallpaperRepository.delete(id);
  }
}
