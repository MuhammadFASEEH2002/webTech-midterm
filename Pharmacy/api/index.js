const router = require("express").Router();
const db = require("../models");



router.post("/medicines", async (req, res) => {
    const medicines = await db.Medicine.find({
        Category: { $regex: req.body.search, $options: "i" }
    }).limit(100)
    res.status(200).json(medicines);
});
router.get('/cart', async (req, res) => {
    const orders = await db.Order.aggregate([
        {
            $lookup: {
                from: 'medicines',
                localField: 'RowId',
                foreignField: 'RowId',
                as: 'order'
            }
        }
    ]);
    res.status(200).json(orders)
})

router.get('/addintocart/:ProductID', async (req, res) => {
    const Available = await db.Order.findOne({ RowId: req.params.ProductID });
    if (!Available) {
        await db.Order.create({
            RowId: req.params.ProductID,
            qty: 1
        })
    }
    const orders = await db.Order.aggregate([
        {
            $lookup: {
                from: 'medicines',
                localField: 'RowId',
                foreignField: 'RowId',
                as: 'cart'
            }
        }
    ]);
    res.status(200).json(orders)
})
// router.get("/students/:regno", async (req, res) => {
//     const student = await db.Student.findOne({ regno: req.params.regno });
//     res.status(200).json(student);
// });

// router.get("/courses/semesters", async (req, res) => {
//     const semesters = await db.Course.distinct("semester");
//     res.status(200).json(semesters);
// });

// router.get("/courses/:regno/:semno", async (req, res) => {
//     db.Course.aggregate([
//         {
//             $lookup: {
//                 from: "registrations",
//                 localField: "courseid",
//                 foreignField: "courseid",
//                 pipeline: [{ $match: { regno: req.params.regno } }],
//                 as: "reg",
//             },
//         },
//         { $match: { semester: Number(req.params.semno) } },
//         { $unwind: { path: "$reg", preserveNullAndEmptyArrays: true } },
//     ])
//         .sort("courseid")
//         .then((courses) => res.status(200).json(courses));
// });

// router.post("/courses/register", async (req, res) => {
//     console.log(req.body);

//     let courseids = [],
//         regs = [];
//     courseids = Array.isArray(req.body.courseid) ? [...courseids, ...req.body.courseid] : [req.body.courseid];

//     for (let courseid of courseids) {
//         regs.push(new db.Registration({ courseid, regno: req.body.regno, gradeid: null }));
//     }
//     const result = await db.Registration.insertMany(regs);
//     res.status(200).json(result);
// });

// router.get("/registrations/:regno", async (req, res) => {
//     Promise.all([
//         db.Registration.aggregate([
//             { $match: { regno: req.params.regno } },
//             { $lookup: { from: "courses", localField: "courseid", foreignField: "courseid", as: "course" } },
//             { $unwind: "$course" },
//             { $lookup: { from: "grades", localField: "gradeid", foreignField: "gradeid", as: "grade" } },
//             { $unwind: { path: "$grade", preserveNullAndEmptyArrays: true } },
//         ]),
//         db.Grade.find().sort("gradeid"),
//         db.Registration.aggregate([
//             { $match: { regno: req.params.regno, gradeid: { $ne: null } } },
//             { $lookup: { from: "courses", localField: "courseid", foreignField: "courseid", as: "course" } },
//             { $unwind: "$course" },
//             { $lookup: { from: "grades", localField: "gradeid", foreignField: "gradeid", as: "grade" } },
//             { $unwind: "$grade" },
//             {
//                 $group: {
//                     _id: null,
//                     tcr: { $sum: "$course.crhr" },
//                     mcr: { $sum: { $multiply: ["$course.crhr", "$grade.gpa"] } },
//                 },
//             },
//             { $project: { _id: 0, GPA: { $divide: ["$mcr", "$tcr"] } } },
//         ]),
//     ]).then(([regs, grades, gpa]) => res.status(200).json([regs, grades, gpa[0]]));
// });

// router.post("/registrations/update", async (req, res) => {
//     console.log(req.body);
//     const reg = await db.Registration.findByIdAndUpdate(
//         { _id: req.body._id },
//         {
//             $set: {
//                 gradeid: req.body.gradeid,
//             },
//         },
//         { new: true }
//     );

//     Promise.all([
//         db.Registration.aggregate([
//             { $match: { $expr: { $eq: ["$_id", { $toObjectId: reg._id }] } } },
//             { $lookup: { from: "courses", localField: "courseid", foreignField: "courseid", as: "course" } },
//             { $unwind: "$course" },
//             { $lookup: { from: "grades", localField: "gradeid", foreignField: "gradeid", as: "grade" } },
//             { $unwind: { path: "$grade", preserveNullAndEmptyArrays: true } },
//         ]),
//         db.Grade.find().sort("gradeid"),
//         db.Registration.aggregate([
//             { $match: { regno: reg.regno, gradeid: { $ne: null } } },
//             { $lookup: { from: "courses", localField: "courseid", foreignField: "courseid", as: "course" } },
//             { $unwind: "$course" },
//             { $lookup: { from: "grades", localField: "gradeid", foreignField: "gradeid", as: "grade" } },
//             { $unwind: "$grade" },
//             {
//                 $group: {
//                     _id: null,
//                     tcr: { $sum: "$course.crhr" },
//                     mcr: { $sum: { $multiply: ["$course.crhr", "$grade.gpa"] } },
//                 },
//             },
//             { $project: { _id: 0, GPA: { $divide: ["$mcr", "$tcr"] } } },
//         ]),
//     ]).then(([regs, grades, gpa]) => res.status(200).json([regs, grades, gpa[0]]));
// });

module.exports = router;
