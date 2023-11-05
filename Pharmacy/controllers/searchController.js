const api = require("../api/api");

exports.getPage = async (req, res) => {
    // console.log(req.query);
    // const medicines = (await api.get(`/api/medicines`)).data;
    // // const semesters = (await api.get(`/api/courses/semesters`)).data;
    // // console.log(student);

    // // const data = await api.get(`/api/registrations/${req.query.regno}`);
    // // //console.log(data.data);
    // // let [regs, grades, gpa] = data.data;
    // // gpa = gpa === null ? { GPA: 0 } : gpa;

    // res.render("medicines.vash", { medicines});
    res.render("index.vash");
};
exports.getMedicines= async (req, res) => {
    //  console.log(req.query);
     const medicines = (await api.post(`/api/medicines`,req.body)).data;
 res.render("medicines.vash", { medicines});

}