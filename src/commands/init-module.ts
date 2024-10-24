import { exec } from 'child_process';
import { prompt } from 'inquirer';
import { writeFile, mkdir } from 'fs';
import { join } from 'path';

function camelToUnderscore(key) {
  var result = key.replace(/([A-Z])/g, ' $1');
  return result.split(' ').join('_').toLowerCase();
}

async function createModule() {
  const { moduleName } = await prompt({
    type: 'input',
    name: 'moduleName',
    message: 'Tên module:',
  });

  const columns = [];
  let addMoreFields = true;

  while (addMoreFields) {
    const field = await prompt([
      {
        type: 'input',
        name: 'fieldName',
        message: 'Tên field:',
      },
      {
        type: 'input',
        name: 'fieldType',
        message: 'Loại field (varchar, bigint, etc.):',
      },
      {
        type: 'confirm',
        name: 'isNullable',
        message: 'Có thể null?',
        default: true,
      },
    ]);

    columns.push(field);

    const { addMore } = await prompt({
      type: 'confirm',
      name: 'addMore',
      message: 'Bạn có muốn thêm field khác không?',
      default: true,
    });

    addMoreFields = addMore;
  }

  // Tạo các đường dẫn cho module, controller, service, DTO, entity, và migration
  const modulePath = join(__dirname, '..', moduleName.toLowerCase());
  const dtoPath = join(modulePath, 'dto');
  const entitiesPath = join(modulePath, 'entities');
  const migrationsPath = join(__dirname, '..', 'database', 'migrations');

  // Tạo các thư mục cần thiết
  mkdir(modulePath, { recursive: true }, (err) => {
    if (err) throw err;
    mkdir(dtoPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    mkdir(entitiesPath, { recursive: true }, (err) => {
      if (err) throw err;
    });
    mkdir(migrationsPath, { recursive: true }, (err) => {
      if (err) throw err;
    });

    createController(modulePath, moduleName);
    createService(modulePath, moduleName);
    createModuleFile(modulePath, moduleName);
    createDTO(dtoPath, moduleName, columns);
    createEntity(entitiesPath, moduleName, columns);
    createMigration(migrationsPath, moduleName, columns);

    console.log(`Module ${moduleName} created successfully.`);
  });
}

function createController(path: string, name: string) {
  const content = `
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ${name}Service } from './${name.toLowerCase()}.service';
import { Create${name}Dto } from './dto/create-${name.toLowerCase()}.dto';
import { Update${name}Dto } from './dto/update-${name.toLowerCase()}.dto';

@Controller('${name.toLowerCase()}')
export class ${name}Controller {
  constructor(private readonly ${name.toLowerCase()}Service: ${name}Service) {}

  @Post()
  create(@Body() create${name}Dto: Create${name}Dto) {
    return this.${name.toLowerCase()}Service.create(create${name}Dto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() query: any,
  ) {
    return this.${name.toLowerCase()}Service.findAll({page,limit},query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${name.toLowerCase()}Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${name}Dto: Update${name}Dto) {
    return this.${name.toLowerCase()}Service.update(+id, update${name}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${name.toLowerCase()}Service.remove(+id);
  }
}
  `;
  writeFile(
    join(path, `${name.toLowerCase()}.controller.ts`),
    content,
    (err) => {
      if (err) throw err;
    },
  );
}

function createService(path: string, name: string) {
  const content = `
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,SelectQueryBuilder } from 'typeorm';
import { Create${name}Dto } from './dto/create-${name.toLowerCase()}.dto';
import { Update${name}Dto } from './dto/update-${name.toLowerCase()}.dto';
import { ${name} } from './entities/${name.toLowerCase()}.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ${name}Service {
  constructor(
    @InjectRepository(${name})
    private readonly ${name.toLowerCase()}Repository: Repository<${name}>,
  ) {}

  async create(create${name}Dto: Create${name}Dto): Promise<${name}> {
    const ${name.toLowerCase()} = this.${name.toLowerCase()}Repository.create(create${name}Dto);
    return this.${name.toLowerCase()}Repository.save(${name.toLowerCase()});
  }

  async findAll(options: IPaginationOptions, query){
    const queryBuilder: SelectQueryBuilder<${name}> = this.${name.toLowerCase()}Repository.createQueryBuilder('${name.toLowerCase()}')
    return paginate<${name}>(queryBuilder, options);
  }

  async findOne(id: number): Promise<${name}> {
    return this.${name.toLowerCase()}Repository.findOne({
      where : {
        id
      }
    });
  }

  async update(id: number, update${name}Dto: Update${name}Dto): Promise<${name}> {
    await this.${name.toLowerCase()}Repository.update(id, update${name}Dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.${name.toLowerCase()}Repository.delete(id);
  }
}
  `;
  writeFile(join(path, `${name.toLowerCase()}.service.ts`), content, (err) => {
    if (err) throw err;
  });
}

function createModuleFile(path: string, name: string) {
  const content = `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${name}Service } from './${name.toLowerCase()}.service';
import { ${name}Controller } from './${name.toLowerCase()}.controller';
import { ${name} } from './entities/${name.toLowerCase()}.entity';

@Module({
  imports: [TypeOrmModule.forFeature([${name}])],
  controllers: [${name}Controller],
  providers: [${name}Service],
})
export class ${name}Module {}
  `;
  writeFile(join(path, `${name.toLowerCase()}.module.ts`), content, (err) => {
    if (err) throw err;
  });
}

function createDTO(path: string, name: string, columns: any[]) {
  // Tạo nội dung cho Create DTO
  const createDtoContent = `
import { IsNotEmpty } from 'class-validator';

export class Create${name}Dto {
${columns
  .map(
    (col) => `  @IsNotEmpty()
  ${col.fieldName}: ${col.fieldType === 'varchar' ? 'string' : 'number'};`,
  )
  .join('\n')}
}
  `;
  writeFile(
    join(path, `create-${name.toLowerCase()}.dto.ts`),
    createDtoContent,
    (err) => {
      if (err) throw err;
    },
  );

  // Tạo nội dung cho Update DTO
  const updateDtoContent = `
import { PartialType } from '@nestjs/mapped-types';
import { Create${name}Dto } from './create-${name.toLowerCase()}.dto';

export class Update${name}Dto extends PartialType(Create${name}Dto) {}
  `;
  writeFile(
    join(path, `update-${name.toLowerCase()}.dto.ts`),
    updateDtoContent,
    (err) => {
      if (err) throw err;
    },
  );
}

function createEntity(path: string, name: string, columns: any[]) {
  const columnsDefinitions = columns
    .map(
      (col) => `
  @Column('${col.fieldType}', { name: '${camelToUnderscore(col.fieldName)}' })
  ${col.fieldName}: ${col.fieldType === 'varchar' ? 'string' : 'number'};
`,
    )
    .join('');

  const entityContent = `
  import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
  } from 'typeorm';

@Entity()
export class ${name} {
  @PrimaryGeneratedColumn()
  id: number;${columnsDefinitions};
  
  @Column('timestamp', {
    name: 'created_timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdTimestamp: Date;

  @Column('timestamp', { name: 'updated_timestamp', nullable: true })
  updatedTimestamp: Date | null;

  @DeleteDateColumn({ name: 'deleted_timestamp' })
  deletedTimestamp: Date;
}
  `;
  writeFile(
    join(path, `${name.toLowerCase()}.entity.ts`),
    entityContent,
    (err) => {
      if (err) throw err;
    },
  );
}

function createMigration(path: string, name: string, columns: any[]) {
  const migrationFileName = `Create${name}Table${Date.now()}`;
  const migrationFilePath = join(path, `${migrationFileName}.ts`);


  const columnDefinitions = columns
    .map(
      (col) => `
          {
            name: '${camelToUnderscore(col.fieldName)}',
            type: '${col.fieldType}',
            isNullable: ${col.isNullable},
          },`,
    )
    .join('');

  const migrationTemplate = `
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ${migrationFileName} implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: '${name.toLowerCase()}',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },${columnDefinitions}
          {
            name: 'created_timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_timestamp',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('${name.toLowerCase()}');
  }
}
  `;

  writeFile(migrationFilePath, migrationTemplate, (err) => {
    if (err) throw err;
  });
}

createModule();
