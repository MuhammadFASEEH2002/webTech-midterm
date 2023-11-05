exports.addToCart = async (req, res) =>{
    const result = await api.get(`/api/addtoCart/${req.query.rowId}`);
    res.render('order.vash', { orders: result.data })
}