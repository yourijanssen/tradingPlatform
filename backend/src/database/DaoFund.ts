import { pool } from "../Util/database";
import { Fund } from "../models/fund";
import * as mysql from "mysql2/promise";

/**
 * Data Access Object (DAO) for Fund-related operations.
 */
export class DaoFund {
  /**
   * Constructs a new DaoFund instance.
   */
  public constructor() {}

  /**
   * Updates the balance of a Fund in the database.
   * @param fund - The Fund object to update.
   * @returns A Promise that resolves to the updated Fund object or null if an error occurs.
   */
  public async setBalance(fund: Fund): Promise<Fund> {
    try {
      const result = await pool.execute(
        "UPDATE fund SET balance = ? WHERE fundId = ?",
        [fund.getBalance(), fund.getFundId()]
      );
      return fund;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  /**
   * Retrieves a Fund associated with a trader.
   * @param fundId - The ID of the Fund to retrieve.
   * @returns A Promise that resolves to the Fund object or void if not found.
   */
  public async getFundForTrader(fundId: number | void): Promise<void | Fund> {
    let fund: void | Fund = null;
    await pool
      .query<mysql.RowDataPacket[]>(
        "SELECT * FROM `fund` where fundId =" + fundId
      )
      .then(([rows, fields]) => {
        rows.forEach(async (elementFund) => {
          //TODO for...of loop
          fund = new Fund();
          fund.setFundId(elementFund["fundId"]);
          fund.doTransaction(elementFund["balance"]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    return fund;
  }
}
