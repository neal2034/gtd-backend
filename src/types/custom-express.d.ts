// custom-express.d.ts
declare namespace Express {
  export interface Request {
    user?: { username: string; [key: string]: any }; // 根据实际情况调整类型
  }
}
