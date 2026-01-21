# 基于 Node.js 18 
FROM node:18-bullseye-slim

WORKDIR /app

# 1. 安装 Python3 和 编译依赖 (Pillow 处理图片需要 libjpeg 等库)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    libjpeg-dev \
    zlib1g-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

# 2. 复制依赖清单
COPY package*.json ./
COPY requirements.txt ./

# 3. 安装 Node 依赖
RUN npm install

# 4. 安装 Python 依赖 (加上 --break-system-packages 允许在系统层安装)
RUN pip3 install -r requirements.txt --break-system-packages

# 5. 复制其余代码
COPY . .

EXPOSE 3000

# 6. 启动命令：开发模式用 nodemon
CMD ["npm", "run", "dev"]