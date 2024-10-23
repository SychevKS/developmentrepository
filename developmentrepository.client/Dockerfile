# Указываем базовый образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./developmentrepository.client/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY ./developmentrepository.client/ .

# Открываем порт 3000
EXPOSE 5173

# Запускаем приложение
CMD ["npm", "run", "dev"]