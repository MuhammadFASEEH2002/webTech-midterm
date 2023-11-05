const express = require("express"),
    path = require("path"),
    PORT = process.env.PORT || 3002,
    app = express();

app.use(express.static(path.join(__dirname, "public")))
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "vash")
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use("/api", require("./api/index"))
    .use("/", require("./routes/index"))
    .listen(PORT, () => console.log(`Server is Listening on http://localhost:${PORT}`));

