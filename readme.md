#Установка

1. Установить Postgresql
2. Создать БД my_db и выполнить миграции: python manage.py migrate
    2.1 Выполнить sql-скрипт icon_data.txt в базе
3. Настроить подключение к ней в project/project/settings.py в секции DATABASES:
    * заменить USER
    * заменить PASSWORD 
4. Установить требуемые библиотеки Python: `pip install -r req.txt`
5. Запустить сервер Django: `python manage.py runserver` (в случае запуска на сервере с доступом извне: `python manage.py runserver 0:80`)
6. Пользоваться!
