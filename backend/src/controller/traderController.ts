import { Request, Response } from "express"; // Import Express types if not already imported
import { Trader } from "../models/trader";
import { TraderService } from "../models/traderService";
import { Transaction } from "../models/transaction";

/**
 * Controller class for managing traders and transactions.
 */
export class TraderController {
  /**
   * Creates an instance of TraderController.
   * @param {TraderService} traderService - The trader service used for data retrieval and manipulation.
   */
  public constructor(private traderService: TraderService) {}

  /**
   * Retrieves a list of all traders.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @returns {Promise<void>} - A Promise that resolves with the list of traders.
   */
  public async getTraders(req: Request, res: Response): Promise<void> {
    let traders: Trader[] = [];

    try {
      traders = (await this.traderService.getTraders()) as Trader[];
      res.status(200).json(traders);
    } catch (error) {
      res.status(404).json({});
    }
  }

  /**
   * Retrieves a trader by their ID.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @returns {Promise<void>} - A Promise that resolves with the trader information.
   */
  public async getTrader(req: Request, res: Response): Promise<void> {
    const traderId: number = +req.params.id;

    let trader;
    try {
      trader = await this.traderService.getTraderById(traderId);
      res.status(200).json(trader);
    } catch (error) {
      res.status(404).json({});
    }
  }

  /**
   * Performs a transaction for a trader.
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @returns {Promise<void>} - A Promise that resolves with the transaction details.
   */
  public async doTransaction(req: Request, res: Response): Promise<void> {
    const traderId: number = +req.params.id;
    const amount: number = +req.params.amount;

    let transaction: Transaction | null = null;
    try {
      transaction = await this.traderService.doTransaction(traderId, amount);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(404).json({});
    }
  }
}
