// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./connection.js";
// import productRoute from "./routes/productRoute.js";
// import cors from "cors";
// import authRoute from "./routes/authRoute.js";
// import cookieParser from "cookie-parser";


// dotenv.config({ path: "./config/config.env" });

// const app = express();
// connectDB();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true
//   })
// );
// app.use(cookieParser());
// app.use(express.json());

// app.use('/api/v1', productRoute); // product route
// app.use('/api/v1/auth', authRoute); // auth route
// app.use('api/v1/auth', authRoute); // auth route

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });








// // import express from "express";
// // import dotenv from "dotenv";
// // import connectDB from "./connection.js";
// // import productRoute from "./routes/productRoute.js";
// // import authRoute from "./routes/authRoute.js";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";

// // dotenv.config({ path: "./config/config.env" });

// // const app = express();

// // // Database Connection
// // connectDB();

// // // Middlewares
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:5173",
// //     ],
// //     credentials: true,
// //   })
// // );

// // app.use(cookieParser());
// // app.use(express.json());

// // // Routes
// // app.use("/api/v1", productRoute);
// // app.use("/api/v1/auth", authRoute);

// // // Default Route
// // app.get("/", (req, res) => {
// //   res.send("Backend API is Running Successfully");
// // });

// // // Export App for Vercel
// // export default app;




// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./connection.js";
// import productRoute from "./routes/productRoute.js";
// import authRoute from "./routes/authRoute.js";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// dotenv.config({ path: "./config/config.env" });

// const app = express();

// connectDB();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://storied-fenglisu-e2f9e9.netlify.app"
//     ],
//     credentials: true
//   })
// );

// app.use(cookieParser());
// app.use(express.json());

// app.use("/api/v1", productRoute);
// app.use("/api/v1/auth", authRoute);

// app.get("/", (req, res) => {
//   res.send("Backend Running Successfully");
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });







import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

dotenv.config({ path: "./config/config.env" });

const app = express();

// Database Connection
connectDB();

// Security Middleware
app.use(helmet());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://storied-fenglisu-e2f9e9.netlify.app",
    ],
    credentials: true,
  })
);

// Other Middlewares
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1", productRoute);
app.use("/api/v1/auth", authRoute);

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Server Start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});