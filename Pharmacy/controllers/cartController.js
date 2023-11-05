const api = require("../api/api");

exports.showCart = async (req, res) =>{
    const result = await api.get('/api/cart');
    res.render('cart.vash', { orders: result.data })
}
exports.addToCart = async (req, res) =>{
    const result = await api.get(`/api/add/cart/${req.query.ProductID}`);
    res.render('cart.vash', { orders: result.data })
}
exports.updateCart = async (req, res) => {
    const result = await api.post('/api/update/cart', req.body)
    res.render('cart.vash', { orders : result.data })
}