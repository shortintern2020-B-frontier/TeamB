const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// json-serverのセットアップ
const server = jsonServer.create();
const router = jsonServer.router('db.json');

// JSONリクエストに対応させる
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// cors対応
server.use(cors());

// 署名作成ワードと有効期限
const SECRET_WORD = 'SECRET1234';
const expiresIn = '1h';

// 署名作成関数
const createToken = payload => jwt.sign(payload, SECRET_WORD, {expiresIn});

// 署名検証関数
const verifyToken = token =>
  new Promise((resolve, reject) =>
    jwt.verify(token, SECRET_WORD, (err, decode) =>
      decode !== undefined ? resolve(decode) : reject(err)
    )
  );

// ユーザーdbファイルを読み込む
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

// ログイン関数
const isAuth = ({name, password}) =>
  userdb.users.findIndex(user => user.name === name && user.password === password) !== -1

// ログインRouter
server.post('/auth/login', (req, res) => {
  const {name, password} = req.body;

  // ログイン認証
  if (isAuth({name, password}) === false) {
    const status = 401;
    const message = 'Incorrect name or password and name is ' + name + ' and password is ' + password;
    res.status(status).json({status, message});
    return
  }

  // ログインに成功すると認証トークンを発行する
  const access_token = createToken({name, password})
  res.status(200).json({access_token})
})

// 登録Router
server.post('/auth/signup', (req, res) => {
  const {name, password} = req.body;
  userdb.users.push({id: userdb.users.length+1, name: name, password: password});
  // 認証トークンを発行する
  const access_token = createToken({name, password})
  res.status(200).json({access_token})
})
// 認証が必要なRouter
server.use(/^(?!\/auth).*$/, async (req, res, next) => {

  /*
  console.log("#######################");
  console.log(req.headers.authorization)
  */

  // 認証ヘッダー形式検証
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }

  //認証トークンの検証
  try {
    await verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    //失効している認証トークン
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})

//認証機能付きのREST APIサーバ起動
server.use(router)
server.listen(8000, () => {
  console.log('Run Auth API Server')
})
