const router = require("express").Router();
const db = require("../models");


router.get("/", async (req, res) => {
    const medicines = await db.Medicine.find({})
    res.render('index');
});

module.exports = router;
