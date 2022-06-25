FROM postgres:latest
RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
	&& localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
	&& localedef -i ru_RU -c -f UTF-8 -A /usr/share/locale/locale.alias ru_RU.UTF-8 \
	&& update-locale LANG=ru_RU.UTF-8 mkdir -p "$PGDATA" && chmod 777 "$PGDATA"
ENV LANG ru_RU.utf8