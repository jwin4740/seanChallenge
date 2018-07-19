var factoryController = require('../controllers/factory-controller.js');
module.exports = function (app) {
    app.post('/newFactory', factoryController.newFactory)
    app.get('/getFactory', factoryController.getFactory)
    app.delete('/deleteFactory', factoryController.burnFactory)
    app.put('/updateFactory', factoryController.updateFactory)
}
