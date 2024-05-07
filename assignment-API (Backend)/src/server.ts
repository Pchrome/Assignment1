import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import peopleRoutes from "./People/Person.routes";
const cors = require("cors");

/** local .env file */
require("dotenv").config();

const router: Express = express();

/** Logging */
router.use(morgan("dev"));

router.use(express.json({ limit: "1000mb" }));
router.use(express.urlencoded({ limit: "1000mb", extended: true }));

/** API Rules */
router.use(cors());

/** Routes */
router.use("/people", peopleRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(router);

/** Open Port 8080 */
const PORT: any = process.env.PORT ?? 8080;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);

module.exports = httpServer;
