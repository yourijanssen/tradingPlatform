import { expect } from "chai";
import { Fund } from "../src/models/fund";
import { Trader, DayTrader, StockTrader, Investor } from "../src/models/trader";
import { Transaction } from "../src/models/transaction";

/**
 * Test suite for Trader Classes.
 */
describe("Trader classes unit tests", () => {
  let fund: Fund;
  let trader: Trader;

  /**
   * Create a new Fund instance and a Trader instance before each test.
   */
  beforeEach(() => {
    fund = new Fund();
  });

  /**
   * Test suite for DayTrader class.
   */
  describe("DayTrader", () => {
    /**
     * Create a new DayTrader instance before each test.
     */
    beforeEach(() => {
      trader = new DayTrader(fund);
    });

    it("should set and get traderId for DayTrader", () => {
      const traderId = 123;
      trader.setTraderId(traderId);
      expect(trader.getTraderId()).to.equal(traderId);
    });

    it("should get the current balance for DayTrader", () => {
      const balance = trader.getBalance();
      expect(balance).to.equal(fund.getBalance());
    });

    it("should perform a valid positive transaction for DayTrader", () => {
      const transactionAmount = 5000;
      const initialBalance = fund.getBalance();

      const transaction: Transaction = trader.transaction(transactionAmount);
      expect(transaction.oldBalance).to.equal(initialBalance);
      expect(transaction.newBalance).to.equal(
        initialBalance + transactionAmount
      );
    });

    it("should perform a valid negative transaction for DayTrader", () => {
      const transactionAmount = -1500;
      const initialBalance = fund.getBalance();

      const transaction: Transaction = trader.transaction(transactionAmount);
      expect(transaction.oldBalance).to.equal(initialBalance);
      expect(transaction.newBalance).to.equal(
        initialBalance + transactionAmount
      );
    });

    it("should disallow a transaction with an amount exceeding the trading limit", () => {
      const transactionAmount = 250000;
      const expected = undefined;

      const transaction: Transaction = trader.transaction(transactionAmount);
      expect(transaction.oldBalance).to.equal(expected);
      expect(transaction.newBalance).to.equal(expected);
    });
  });

  /**
   * Test suite for StockTrader class.
   */
  describe("StockTrader", () => {
    /**
     * Create a new StockTrader instance before each test.
     */
    beforeEach(() => {
      trader = new StockTrader(fund);
    });

    it("should set and get traderId for StockTrader", () => {
      const traderId = 456;
      trader.setTraderId(traderId);
      expect(trader.getTraderId()).to.equal(traderId);
    });

    it("should get the current balance for StockTrader", () => {
      const balance = trader.getBalance();
      expect(balance).to.equal(fund.getBalance());
    });

    it("should perform a valid positive transaction for StockTrader", () => {
      const transactionAmount = 1000;
      const initialBalance = fund.getBalance();

      const transaction: Transaction = trader.transaction(transactionAmount);
      expect(transaction.oldBalance).to.equal(initialBalance);
      expect(transaction.newBalance).to.equal(
        initialBalance + transactionAmount
      );
    });

    it("should perform a valid negative transaction for StockTrader", () => {
      const transactionAmount = -1500;
      const initialBalance = fund.getBalance();

      const transaction: Transaction = trader.transaction(transactionAmount);
      expect(transaction.oldBalance).to.equal(initialBalance);
      expect(transaction.newBalance).to.equal(
        initialBalance + transactionAmount
      );
    });

    it("should disallow a transaction with an amount exceeding the trading limit", () => {
      const transactionAmount = 400;
      const expected = undefined;

      const transaction: Transaction = trader.transaction(transactionAmount);
      expect(transaction.oldBalance).to.equal(expected);
      expect(transaction.newBalance).to.equal(expected);
    });
  }),
    /**
     * Test suite for Investor class.
     */
    describe("Investor", () => {
      /**
       * Create a new Investor instance before each test.
       */
      beforeEach(() => {
        trader = new Investor(fund);
      });

      it("should set and get traderId for Investor", () => {
        const traderId = 789;
        trader.setTraderId(traderId);
        expect(trader.getTraderId()).to.equal(traderId);
      });

      it("should get the current balance for Investor", () => {
        const balance = trader.getBalance();
        expect(balance).to.equal(fund.getBalance());
      });

      it("should perform a valid positive transaction for Investor", () => {
        const transactionAmount = 60000;
        const initialBalance = fund.getBalance();

        const transaction: Transaction = trader.transaction(transactionAmount);

        expect(transaction.oldBalance).to.equal(initialBalance);
        expect(transaction.newBalance).to.equal(
          initialBalance + transactionAmount
        );
      });

      it("should perform a valid negative transaction for Investor", () => {
        const initialBalance = 10000;
        const transactionAmount = -2500;
        fund.doTransaction(initialBalance);
        const transaction: Transaction = trader.transaction(transactionAmount);

        expect(transaction.oldBalance).to.equal(initialBalance);
        expect(transaction.newBalance).to.equal(
          initialBalance + transactionAmount
        );
      });

      it("should disallow a positive transaction with an amount less than 50000", () => {
        const transactionAmount = 49000;
        const expected = undefined;

        const transaction: Transaction = trader.transaction(transactionAmount);
        expect(transaction.oldBalance).to.equal(expected);
        expect(transaction.newBalance).to.equal(expected);
      });

      it("should disallow a negative transaction with an amount exceeding 50% of the current balance", () => {
        const initialBalance = 10000;
        const transactionAmount = -6000;
        const expected = undefined;

        fund.doTransaction(initialBalance);
        const transaction: Transaction = trader.transaction(transactionAmount);

        expect(transaction.oldBalance).to.equal(expected);
        expect(transaction.newBalance).to.equal(expected);
      });
    });
});
