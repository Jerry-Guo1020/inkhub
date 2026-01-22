# server/Dockerfile
FROM node:16-bullseye-slim

WORKDIR /app

# 换源
RUN sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list

# 安装基础工具
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY requirements.txt ./

# 【关键】全局安装 nodemon
RUN npm install -g nodemon --registry=https://registry.npmmirror.com

# 安装项目依赖
RUN npm install --registry=https://registry.npmmirror.com
RUN pip3 install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

COPY . .

EXPOSE 3000

# 启动命令
CMD ["npm", "run", "dev"]