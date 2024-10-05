import express from "express";
import AppError from "./utils/errorClass.js";
import dbconnection from "./database/dbConnection.js";
import Bootstrap from "./src/bootstrap.js";
import cors from "cors"
import handleWebhook from "./utils/webhook.js";
import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use('/api/webhook/', express.raw({ type: 'application/json' }), handleWebhook);


app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use(cors())

Bootstrap(app)

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
        .json({ error: "Error", message: err.message, stack: err.stack })
);
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
