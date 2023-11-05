const api = require("../api/api");

exports.getPage = async (req, res) => {
    res.render("index.vash");
};
exports.getMedicines= async (req, res) => {
    //  console.log(req.query);
     const medicines = (await api.post(`/api/medicines`,req.body)).data;
 res.render("medicines.vash", { medicines});

}