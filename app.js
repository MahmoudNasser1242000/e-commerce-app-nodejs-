import express from "express";
import AppError from "./utils/errorClass.js";
import dbconnection from "./database/dbConnection.js";
const app = express();

dbconnection()

app.get("/", (req, res) =>
    res.status(200).json({ msg: "Welcome to e-commerce app!" })
);

app.use("**", (req, res, next) =>
    next(new AppError("404 page not found!", 404))
);

app.use((err, req, res, next) =>
    res
        .status(err.statusCode || 500)
        .json({ error: "Error", message: err.message })
);
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
