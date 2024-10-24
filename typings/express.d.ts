import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Thay thế 'any' bằng kiểu dữ liệu cụ thể của người dùng nếu có
    }
  }
}