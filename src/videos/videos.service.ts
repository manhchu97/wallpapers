import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

@Injectable()
export class VideoService {
  async convertM3U8ToLivePhoto(m3u8Url: string): Promise<{ imageBuffer: Buffer; videoBuffer: Buffer }> {
    return new Promise((resolve, reject) => {
      const imageBuffers: Buffer[] = [];
      const videoBuffers: Buffer[] = [];

      // Lấy khung hình
      ffmpeg(m3u8Url)
        .outputOptions('-ss 00:00:01') // Lấy khung hình ở giây thứ nhất
        .outputOptions('-vframes 1')
        .on('end', () => {
          console.log('Lấy khung hình thành công');

          // Lấy video ngắn
          ffmpeg(m3u8Url)
            .outputOptions('-ss 00:00:01') // Bắt đầu từ giây thứ nhất
            .outputOptions('-t 3') // Thời gian video 3 giây
            .outputOptions('-c:v copy') // Giữ nguyên codec video
            .on('data', (chunk) => {
              videoBuffers.push(chunk);
            })
            .on('end', () => {
              console.log('Lấy video thành công');
              resolve({
                imageBuffer: Buffer.concat(imageBuffers),
                videoBuffer: Buffer.concat(videoBuffers),
              });
            })
            .on('error', (error) => {
              console.error('Lỗi khi lấy video:', error);
              reject(error);
            })
            .pipe(); // Bắt đầu ghi video vào buffer
        })
        .on('data', (chunk) => {
          imageBuffers.push(chunk);
        })
        .on('error', (error) => {
            console.log(error)
          console.error('Lỗi khi lấy khung hình:', error);
          reject(error);
        })
        .pipe(); // Bắt đầu ghi khung hình vào buffer
    });
  }
}
