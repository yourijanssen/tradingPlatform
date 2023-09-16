import * as trader from "./controller/traderController";
import express = require("express");
import { DaoUser } from "./database/DaoUser";
import { TraderService } from "./models/traderService";

export const app = express();

// Enable CORS headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Create instances of DaoUser, TraderService, and TraderController
const userDao: DaoUser = new DaoUser();
const traderService: TraderService = new TraderService(userDao);
const traderController: trader.TraderController = new trader.TraderController(
  traderService
);

/**
 * Route for the root endpoint.
 */
app.get("/", (req, res) => {
  res.status(200).json({ Reply: "Welcome to our trading platform!" });
});

/**
 * Route for retrieving all traders.
 */
app.get("/traders", async (req, res) => {
  traderController.getTraders(req, res);
});

/**
 * Route for retrieving a trader by ID.
 * @param {number} id - The ID of the trader to retrieve.
 */
app.get("/trader/:id", (req, res) => {
  traderController.getTrader(req, res);
});

/**
 * Route for performing a transaction for a trader.
 * @param {number} id - The ID of the trader.
 * @param {number} amount - The amount of the transaction.
 */
app.post("/trader/transaction/:id/:amount", (req, res) => {
  traderController.doTransaction(req, res);
});

// Set the port and start the server
const PORT = process.env.PORT || 4001;

/**
 * Start the server and listen for incoming requests.
 */
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
