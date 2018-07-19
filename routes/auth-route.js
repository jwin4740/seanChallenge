var authController = require('../controllers/auth-controller.js');
module.exports = function (app) {
    app.get('/index', authController.index);
    app.get('/', authController.index);
}
 