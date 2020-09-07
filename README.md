#  注意点
フロントとバックエンドのdocker-composeを分けたので、フロントを起動する場合はfrontでdocker-compose up.バックエンドを起動する場合はback_endでdocker-compose up をしてください。
初回はフロントとバックエンドを共有するネットワークを作成するコマンドが必要なので以下のコマンドを入力してください
#  初回
docker network create shared-network
#  backend(初回)
docker-compose build --no-cache  
##  それ以降
docker-compose up -d
##  railsコンテナに入る場合
docker-compose exec web /bin/bash

##  binding.pryを使用する場合
docker attach back_end_web_1
back_end_web_1はコンテナ名
Macならcontinueと入力した後Ctrl+p+qで抜けられます。
##  終了時
docker-compose down
#  frontend
docker-compose up -d


