const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const medicineSchema = new Schema({
    RowId: Number,
    Category: String,
    Name: String,
    CatId: Number,
    Price: Number,
    Stock: Number,
    Barcode: String,
    GenericName: String,
    Manufacturer: String
})

exports.Medicine = model('Medicine', medicineSchema);
