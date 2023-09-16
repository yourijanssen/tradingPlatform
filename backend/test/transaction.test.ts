import { expect } from "chai";
import { Transaction } from "../src/models/transaction";

/**
 * Test suite for the Transaction class.
 */
describe("Transaction class unit tests", () => {
  let transaction: Transaction;

  /**
   * Create a new Transaction instance before each test.
   */
  beforeEach(() => {
    transaction = new Transaction();
  });

  /**
   * Test case for setting and getting the traderId.
   */
  it("should set and get traderId correctly", () => {
    const traderId = 42;

    transaction.traderId = traderId;
    const retrievedTraderId = transaction.traderId;
    expect(retrievedTraderId).to.equal(traderId);
  });

  /**
   * Test case for setting and getting oldBalance.
   */
  it("should set and get oldBalance correctly", () => {
    const oldBalance = 1000;

    transaction.oldBalance = oldBalance;
    const retrievedOldBalance = transaction.oldBalance;
    expect(retrievedOldBalance).to.equal(oldBalance);
  });

  /**
   * Test case for setting and getting newBalance.
   */
  it("should set and get newBalance correctly", () => {
    const newBalance = 2000;

    transaction.newBalance = newBalance;
    const retrievedNewBalance = transaction.newBalance;
    expect(retrievedNewBalance).to.equal(newBalance);
  });

  /**
   * Test case for getting the transaction date as a string.
   */
  it("should get the transaction date as a string", () => {
    const date = new Date();
    const formattedDate = date.toDateString();

    transaction.setDate();
    const retrievedDate = transaction.getDate();
    expect(retrievedDate).to.equal(formattedDate);
  });
});
