#Установка

1. Установить Postgresql
2. Создать БД my_db и выполнить миграции: python manage.py migrate
3. Выполнить sql-скрипт icon_data.txt в базе
4. Настроить подключение к ней в project/project/settings.py в секции DATABASES:
    * указать NAME (название бд) 
    * заменить USER
    * заменить PASSWORD 
5. Установить требуемые библиотеки Python: `pip install -r req.txt`
6. Запустить сервер Django: `python manage.py runserver` (в случае запуска на сервере с доступом извне: `python manage.py runserver 0:80`)
7. Запустить приложение и пройти регистрацию
