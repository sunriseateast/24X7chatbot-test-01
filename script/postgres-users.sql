-- Run on first container startup
CREATE USER admineatsmoon WITH PASSWORD '$ky!sB!Ue';
CREATE DATABASE users OWNER admineatsmoon;
GRANT ALL PRIVILEGES ON DATABASE users TO admineatsmoon;
