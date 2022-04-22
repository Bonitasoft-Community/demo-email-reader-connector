#!/usr/bin/env sh
docker pull greenmail/standalone:1.6.0
docker run -t -i -p 2525:3025 -p 3110:3110 -p 3143:3143 \
                 -p 3465:3465 -p 3993:3993 -p 3995:3995 \
                 greenmail/standalone:1.6.0