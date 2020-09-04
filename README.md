# 初回clone時
docker-compose build --no-cache  
# それ以降
docker-compose up -d
# railsコンテナに入る場合
docker-compose exec web /bin/bash

# 終了時
docker-compose down

