import { DaoFund } from "../database/DaoFund";
import { DaoUser } from "../database/DaoUser";
import { Fund } from "./fund";
import { DayTrader, Investor, StockTrader, Trader } from "./trader";
import { Transaction } from "./transaction";

/**
 * Service class for managing traders and their transactions.
 */
export class TraderService {
  private traders: Trader[] = [];

  /**
   * Constructs a new TraderService instance.
   * @param daoUser - The data access object for user-related operations.
   * @param daoFund - The data access object for fund-related operations (optional).
   */
  public constructor(
    private daoUser: DaoUser,
    private daoFund: DaoFund = new DaoFund()
  ) {}

  /**
   * Retrieves the trader ID for the current user.
   * @returns A Promise that resolves to the trader ID.
   */
  public getTraderID(): Promise<number> {
    return this.daoUser.getTraderID();
  }

  /**
   * Retrieves all trader IDs except those in the knownIds array.
   * @param knownIds - An array of known trader IDs.
   * @returns A Promise that resolves to an array of trader IDs.
   */
  public getAllTraderIDs(knownIds: number[]): Promise<number[]> {
    return this.daoUser.getAllTraderIDs(knownIds);
  }

  /**
   * Retrieves the fund ID associated with a trader.
   * @param traderId - The ID of the trader.
   * @returns A Promise that resolves to the fund ID or void if not found.
   */
  public getFundId(traderId: number): Promise<number | void> {
    return this.daoUser.getFundIdForTrader(traderId);
  }

  public getMetaData(traderId: number): Promise<number[] | void> {
    return this.daoUser.getMetaDataForTrader(traderId);
  }

  /**
   * Retrieves the fund associated with a trader.
   * @param traderId - The ID of the trader.
   * @returns A Promise that resolves to the Fund object or void if not found.
   */
  public getFund(traderId: number): Promise<Fund | void> {
    return this.daoFund.getFundForTrader(traderId);
  }

  /**
   * Retrieves metadata associated with a trader and creates the corresponding Trader object.
   * @param traderId - The ID of the trader.
   * @returns A Promise that resolves to an array of Trader objects or void if not found.
   */
  public async getTrader(traderId: number): Promise<Trader[] | void> {
    let fund: Fund = null;

    await this.getMetaData(traderId).then(async (metaData) => {
      if (Number.isInteger(metaData[0])) {
        await this.getFund(metaData[0] as number).then((result2) => {
          fund = result2 as Fund;
          if (metaData[1] == 1) {
            this.traders.push(this.createDayTrader(traderId, fund));
          } else if (metaData[1] == 2) {
            this.traders.push(this.createStockTrader(traderId, fund));
          } else {
            this.traders.push(this.createInvestor(traderId, fund));
          }
        });
      }
    });

    return this.traders;
  }

  /**
   * Retrieves all traders and updates the internal traders array.
   * @returns A Promise that resolves to an array of Trader objects or void if not found.
   */
  public async getTraders(): Promise<Trader[] | void> {
    let traderIds: number[] = [];
    let knowIds: number[] = [];

    for (let trader of this.traders) {
      knowIds.push(trader.getTraderId());
    }

    await this.getAllTraderIDs(knowIds).then((result) => {
      traderIds = result;
    });

    for (const traderId of traderIds) {
      await this.getTrader(traderId).catch((error) => {
        console.log(error);
      });
    }

    return this.traders;
  }

  /**
   * Retrieves a Trader object by trader ID.
   * @param id - The ID of the trader to retrieve.
   * @returns A Promise that resolves to the Trader object.
   */
  public async getTraderById(id: number): Promise<Trader> {
    let trader: Trader = null;
    this.traders.forEach((tmpTrader) => {
      if (tmpTrader.getTraderId() == id) {
        trader = tmpTrader;
        return;
      }
    });

    try {
      if (trader == null) {
        await this.getTrader(id);
        if (this.traders.length > 0) {
          trader =
            this.traders[this.traders.length - 1].getTraderId() == id
              ? this.traders[this.traders.length - 1]
              : trader;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return trader;
  }

  /**
   * Performs a transaction for a trader.
   * @param traderId - The ID of the trader.
   * @param amount - The amount of the transaction.
   * @returns A Promise that resolves to a Transaction object.
   */
  public async doTransaction(
    traderId: number,
    amount: number
  ): Promise<Transaction> {
    let transaction: Transaction = new Transaction();
    try {
      let trader = await this.getTraderById(traderId);
      transaction = trader.transaction(amount);
      if (transaction["_newBalance"] !== undefined) {
        let result = await this.daoFund.setBalance(trader.getFund());
        if (result == null) {
          console.log("Error???");
        }
      }
    } catch (error) {
      console.log(error);
    }

    return transaction;
  }

  private createDayTrader(traderId: number, fund: Fund): DayTrader {
    let dayTrader: DayTrader = new DayTrader(fund);
    dayTrader.setTraderId(traderId);
    return dayTrader;
  }

  private createStockTrader(traderId: number, fund: Fund): StockTrader {
    let stockTrader: StockTrader = new StockTrader(fund);
    stockTrader.setTraderId(traderId);
    return stockTrader;
  }

  private createInvestor(traderId: number, fund: Fund): Investor {
    let investor: Investor = new Investor(fund);
    investor.setTraderId(traderId);
    return investor;
  }
}
