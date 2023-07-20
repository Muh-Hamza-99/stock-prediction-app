const express = require("express");
const app = express();

const expressRateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const CORS = require("cors");

const userRouter = require("./routes/user-routes");
const keyRouter = require("./routes/key-routes");

const globalErrorHandler = require("./middleware/error-handler");

const rateLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000,
	max: 200,
	standardHeaders: true, 
});

app.use(express.json({ limit: "10kb" }));

app.use(CORS({
    origin: "http://127.0.0.1:5173",
    credentials: true,
}));
app.use(cookieParser());

app.use("/api", rateLimiter);

app.use("/api/users", userRouter);
app.use("/api/keys", keyRouter);

app.all("*", (req, res, next) => {
    res.status(404).json({ status: "fail", message: `Can't find ${req.originalUrl} on this server!` });
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));