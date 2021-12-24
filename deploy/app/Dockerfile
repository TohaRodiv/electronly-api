FROM node:16.13.0-alpine3.11

# Папка приложения
ARG APP_DIR=/usr/app
WORKDIR ${APP_DIR}

# Установка нужной версии npm
RUN ["npm", "install", "-g", "npm@7.24.2"]

# Копируем зависимости
COPY package*.json ./

# Ставим зависимости
RUN npm install

# Копирование файлов проекта
COPY . .

# Собираем приложение
RUN npm run build

RUN npx ts-node ./node_modules/typeorm/cli -f ./dist/config/DatabaseConfig.js migration:generate --name AddRelationFilesToArticle
RUN npx ts-node ./node_modules/typeorm/cli -f ./dist/config/DatabaseConfig.js migration:run

# Запуск проекта
CMD npm run start:prod
