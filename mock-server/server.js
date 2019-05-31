const jsonServer = require('json-server');
const proxy = require('http-proxy-middleware');
const { dbFile } = require('./db');
const routes = require('./routes');

const server = jsonServer.create();
const router = jsonServer.router(dbFile);
const middlewares = jsonServer.defaults();

const jsonServerProxy = proxy({
  target: 'https://cnodejs.org/api',
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 反向代理
// server.use('/api', jsonServerProxy);

// All routes for the server
routes(server);

router.render = (req, res) => {
  if (req.method === 'GET') {
    if (req.path === '/users') {
      const users = res.locals.data.map((item) => {
        delete item.password;

        return item;
      });

      res.jsonp(users);

      return;
    }

    const singleUser = req.path.match(/\/users\/(\d+)/);

    if (singleUser) {
      delete res.locals.data.password;

      res.jsonp(res.locals.data);

      return;
    }
  }

  res.jsonp(res.locals.data);
};

server.use(router);

server.listen(4000, () => {
  console.log('JSON server is running on port 4000.');
});
