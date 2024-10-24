import { google, youtube_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';

export class YoutubeUploader {
  private youtube: youtube_v3.Youtube;
  private oauth2Client: OAuth2Client;

  constructor(accessToken: string) {
    this.oauth2Client = new google.auth.OAuth2();
    this.oauth2Client.setCredentials({ access_token: accessToken });

    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  /**
   * Upload video lên YouTube cho tài khoản hiện tại
   * @param videoPath - Đường dẫn tới file video
   * @param title - Tiêu đề của video
   * @param description - Mô tả của video
   * @param tags - Tags cho video
   * @param categoryId - ID danh mục của video
   */
  async uploadVideo(
    videoPath: string,
    title: string,
    description: string,
    tags: string[],
    categoryId: string,
  ): Promise<any> {
    try {
      const videoFile = fs.createReadStream(videoPath);

      const response = await this.youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title,
            description,
            tags,
            categoryId,
          },
          status: {
            privacyStatus: 'public', 
          },
        },
        media: {
          body: videoFile,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading video:', error.message);
      throw new Error('Failed to upload video');
    }
  }
}