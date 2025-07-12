#!/bin/bash
set -e

cd /root/blog

hugo serve --bind=0.0.0.0 -b https://wwww.milaiai.com

exec "$@"
