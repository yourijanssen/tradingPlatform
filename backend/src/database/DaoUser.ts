import { pool } from "../Util/database";
import * as mysql from "mysql2/promise";

/**
 * Data Access Object (DAO) for managing user-related database operations.
 */
export class DaoUser {
  /**
   * Creates an instance of DaoUser.
   */
  public constructor() {}

  /**
   * Retrieves the trader ID from the database.
   * @returns A Promise that resolves to the trader ID.
   */
  public async getTraderID(): Promise<number> {
    const trader = await pool.query<mysql.RowDataPacket[]>(
      "SELECT * FROM trader"
    );
    return trader[0][0]["fundId"];
  }

  /**
   * Retrieves all trader IDs, excluding known IDs.
   * @param knownIds - An array of known trader IDs to exclude.
   * @returns A Promise that resolves to an array of trader IDs.
   */
  public async getAllTraderIDs(knownIds: number[]): Promise<number[]> {
    let ids: number[] = [];
    try {
      let trader = null;
      if (knownIds.length == 0) {
        trader = await pool.query<mysql.RowDataPacket[]>(
          "SELECT * FROM startingpoint.trader;"
        );
      } else {
        trader = await pool.query<mysql.RowDataPacket[]>(
          "SELECT * FROM startingpoint.trader WHERE traderId NOT IN (?);",
          [knownIds]
        );
      }
      for (const element in trader[0]) {
        ids.push(trader[0][element]["traderId"]);
        this.getFundIdForTrader(ids[0]);
      }
    } catch (error) {
      console.log(error);
    }
    return ids;
  }

  /**
   * Retrieves the fund ID associated with a trader.
   * @param traderId - The trader's ID.
   * @returns A Promise that resolves to the fund ID or void if not found.
   */
  public async getFundIdForTrader(traderId: number): Promise<number | void> {
    let queryResult = null;
    try {
      queryResult = await pool.query<mysql.RowDataPacket[]>(
        "SELECT * FROM `trader` where traderId =" + traderId
      );
      return queryResult[0][0]["fundId"];
    } catch (error) {
      console.log(error);
    }
    return queryResult;
  }

  /**
   * Retrieves metadata for a trader.
   * @param traderId - The trader's ID.
   * @returns A Promise that resolves to an array containing fund ID and trader type, or void if not found.
   */
  public async getMetaDataForTrader(
    traderId: number
  ): Promise<number[] | void> {
    let queryResult = null;
    try {
      queryResult = await pool.query<mysql.RowDataPacket[]>(
        "SELECT * FROM `trader` where traderId =" + traderId
      );
      return [queryResult[0][0]["fundId"], queryResult[0][0]["traderType"]];
    } catch (error) {
      console.log(error);
    }
    return queryResult;
  }
}
