FROM mariadb:latest

VOLUME mysql:/var/lib/mysql

ADD ./database /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_INITDB_SKIP_TZINFO 1
