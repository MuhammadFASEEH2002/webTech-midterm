const router = require("express").Router();
const ctrl = require("../controllers");

router.get("/", ctrl.Medicine.getPage);
router.post("/medicines", ctrl.Medicine.getMedicines)
router.get("/cart", ctrl.Cart.showCart);

router.get("/addintocart", ctrl.Cart.addToCart);

// router.get("/", async (req, res) => {
//     const medicines = await db.Medicine.find({})
//     res.render('index');
// });
// router.get("/medicines/:regno", async (req, res) => {
//     const student = await db.Student.findOne({ regno: req.params.regno });
//     res.status(200).json(student);
// });

module.exports = router;
