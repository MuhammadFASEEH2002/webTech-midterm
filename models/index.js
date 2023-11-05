const mongoose = require("mongoose");
const { Medicine } = require("./Medicine");
const { Order } = require("./Order");

(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/pharmacy`);
})();

module.exports = {
    Medicine,
    Order
};
