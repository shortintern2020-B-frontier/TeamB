# TheaTalk

## 起動方法

 `docker-compose build`
でビルドします。

`docker-compose up`
で開発環境の実行が出来ます。

## testとlintの回し方

`docker-compose exec front bash` でコンテナにアクセスします。

`yarn test && yarn lint` でtestとlintを回すことが出来ます。

## mock serverのdbの中身の確認方法

`docker-compose exec json_server bash` でコンテナにアクセスします。

`cat db.json` でdbの中身を確認することが出来ます。

## 製作者について
基本的に名前がついていないところは Ryuto Hattoriが書きました