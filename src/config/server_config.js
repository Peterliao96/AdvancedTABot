module.exports = {
  database: 'mongodb+srv://peterliao96:b2140514051405@cluster0-ajlpx.gcp.mongodb.net/test?retryWrites=true',
  server: {
    port: 8888,
    host: 'peterliao.co',
  },
  jwt: {
    secret: 'asfasfasdf',
    expiresIn: '1d',
  },
};
