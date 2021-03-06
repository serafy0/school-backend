const express = require("express");
const router = require("./routes");
const courseRouter = require("./routes/course");
const sessionRouter = require("./routes/session");
const feedRouter = require("./routes/Feedback");
const parentRouter = require("./routes/parent");
require("dotenv").config();

const session = require("./middleware/session ");

const corsMw = require("./middleware/cors");
const apiErrorHandler = require("./errors/api-error-handler");

const dbSetup = require("./db/db-setup");
dbSetup();

const app = express();

app.use(express.json());

//setup CORS login
app.options("*", corsMw);
app.use(corsMw);

app.use(session);

app.use("/course", courseRouter);
app.use("/session", sessionRouter);
app.use("/feedback", feedRouter);
app.use("/p", parentRouter);

app.use(router);

app.use(apiErrorHandler);

app.listen(process.env.PORT||8088, () => console.log("server is running on port 8080"));
