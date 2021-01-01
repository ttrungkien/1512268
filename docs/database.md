mysql -u root -p

show databases;
use [database];
CREATE DATABASE IF NOT EXISTS [database_name];
DROP DATABASE IF EXISTS [database_name];

show tables;
DROP TABLE IF EXISTS [table_name];
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where TABLE_NAME=[table_name]';