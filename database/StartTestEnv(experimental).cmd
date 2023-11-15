@echo off

docker-compose up -d

set PASSWORD=K0chamTesty

mysql -h 127.0.0.1 -p%PASSWORD% -u root < zpi_db.sql
mysql -h 127.0.0.1 -p%PASSWORD% -u root < filling_data_db.sql
pause