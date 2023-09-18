import * as trader from "./controller/traderController";
import express = require("express");
import { DaoUser } from "./database/DaoUser";
import { TraderService } from "./models/traderService";

export const app = express();

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

let userDao: DaoUser = new DaoUser();
let traderService: TraderService = new TraderService(userDao);
let traderController: trader.TraderController = null;

export function initTraderController(traderService: TraderService) {
  traderController = new trader.TraderController(traderService);
}

initTraderController(traderService);

app.get("/", (req, res) => {
  res.status(200).json({ Reply: "Welcome to our trading platform!" });
});

app.get("/traders", async (req, res) => {
  traderController.getTraders(req, res);
});

app.get("/trader/:id", (req, res) => {
  traderController.getTrader(req, res);
});

app.post("/trader/transaction/:id/:amount", (req, res) => {
  traderController.doTransaction(req, res);
});

// set port, listen for requests
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
