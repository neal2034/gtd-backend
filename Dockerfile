FROM node:18 as builder

# 创建并设置工作目录
WORKDIR /usr/src/app

COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件和目录到工作目录中
COPY . .

# 构建应用程序
RUN npm run build

# 阶段 2: 运行
# 使用较小的基础镜像来减少最终镜像的大小
FROM node:18-alpine

# 设置非 root 用户，提高安全性
USER node

# 创建并设置工作目录
WORKDIR /usr/src/app

# 从构建阶段复制 node_modules 和构建出的文件
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# 暴露应用程序运行时使用的端口
EXPOSE 3000

# 设置环境变量
ENV NODE_ENV=production

# 定义运行应用程序的命令
CMD ["node", "dist/main"]


