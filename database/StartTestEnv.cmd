@echo off

docker-compose up -d

set PASSWORD=K0chamTesty

mysql -hlocalhost -p%PASSWORD% -u root < create_database.sql
mysql -hlocalhost -p%PASSWORD% -u root < filling_data_db.sql
pause