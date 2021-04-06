FROM ubuntu:20.04

WORKDIR /app

RUN apt-get update

RUN apt-get -y install curl
RUN curl -fsSL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get -y install rtl-433 nodejs

COPY . .

CMD ./run.sh
