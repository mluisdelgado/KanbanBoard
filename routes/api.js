const controller = require("../controllers/apiController")

module.exports = function(api){

    api.route('/data')
    .get((req, res) => {
        controller.GETdata(req, res);
    })
    .post((req, res) => {
        controller.POSTdata(req, res);
    })

    api.route('/model')
    .get((req, res) => {
        controller.GETmodel(req, res);
    })
    .post((req, res) => {
        controller.POSTmodel(req, res);
    })

}
