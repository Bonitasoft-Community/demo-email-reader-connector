#!/usr/bin/env sh
./stop.sh
docker-compose -p GreenMail pull
docker-compose -p GreenMail build
docker-compose -p GreenMail up -d