module.exports = {
  database: "mongodb+srv://peterliao96:b2140514051405@cluster0-ajlpx.gcp.mongodb.net/friendChat",//'mongodb://127.0.0.1:27017/friendChat',
  server: {
    port: 8888,
    host: 'peterliao96.me',
  },
  jwt: {
    secret: 'asfasfasdf',
    expiresIn: '1d',
  },
};
