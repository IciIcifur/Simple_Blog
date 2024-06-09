# Указывает Docker использовать официальный образ python 3 с dockerhub в качестве базового образа
FROM python:3.11-slim
# Устанавливает переменную окружения, которая гарантирует, что вывод из python будет отправлен прямо в терминал без предварительной буферизации
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
# Устанавливает рабочий каталог контейнера — "simpleBlog"
RUN mkdir /simpleBlog
WORKDIR /simpleBlog
# Копирует все файлы из нашего локального проекта в контейнер
COPY . .
# Запускает команду pip install для всех библиотек, перечисленных в requirements.txt
RUN pip install --no-cache-dir --upgrade pip django
RUN pip install -r requirements.txt
