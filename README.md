#  注意点
フロントとバックエンドのdocker-composeを分けたので、フロントを起動する場合はfrontでdocker-compose up.バックエンドを起動する場合はback_endでdocker-compose up をしてください。
#  backend(初回)
docker-compose build --no-cache  
##  それ以降
docker-compose up -d
##  railsコンテナに入る場合
docker-compose exec web /bin/bash
##  終了時
docker-compose down
#  frontend
docker-compose up -d


