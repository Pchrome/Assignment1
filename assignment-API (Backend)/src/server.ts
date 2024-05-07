//@ts-nocheck

import { Consent } from "./Consent/Consent.model";
import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
/*import parentRoutes from "./Parent/Parent.routes";*/

const cors = require("cors");

require("dotenv").config();

const router: Express = express();

/** Logging */
router.use(morgan("dev"));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

router.use(express.json({ limit: "1000mb" }));
router.use(express.urlencoded({ limit: "1000mb", extended: true }));

/** RULES OF OUR API */
router.use(cors());



/** Routes */
/*router.use("/parent", parentRoutes);*/

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});


/** Server */
const httpServer = http.createServer(router);
//Open Port 8080
const PORT: any = process.env.PORT ?? 8080;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);

module.exports = httpServer;
