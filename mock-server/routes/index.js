const user = require('./user');
const shop = require('./shop');

module.exports = function (app) {
  app.get('/health', (req, res) => {
    res.status(200);
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.json({
      health: 'good',
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    });
  });

  app.use([user, shop]);
};
