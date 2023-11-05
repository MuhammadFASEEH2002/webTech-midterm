const api = require("../api/api");

exports.addToCart = async (req, res) =>{
    const result = await api.get(`/api/addintocart/${req.query.ProductID}`);
    res.render('cart.vash', { orders: result.data })
}
exports.showCart = async (req, res) =>{
    const result = await api.get('/api/cart');
    res.render('cart.vash', { orders: result.data })
}