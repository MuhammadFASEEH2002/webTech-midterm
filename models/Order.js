const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const orderSchema = new Schema({
    RowId: Number,
    qty: Number,
})

exports.Order = model('Order', orderSchema);
