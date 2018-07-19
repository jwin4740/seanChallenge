var childController = require('../controllers/child-controller.js');
module.exports = function (app) {
    app.post('/newChild', childController.newChild)
    app.get('/getChild', childController.getChild)
}
