import { expect } from "chai";
import { Fund } from "../src/models/fund";

/**
 * Test suite for the Fund class.
 */
describe("Fund class unit tests", () => {
  let fund: Fund;

  /**
   * Create a new Fund instance before each test.
   */
  beforeEach(() => {
    fund = new Fund();
  });

  /**
   * Test case for setting and getting the fundId.
   */
  it("should set and get fundId correctly", () => {
    const fundId = 42;

    fund.setFundId(fundId);
    const retrievedFundId = fund.getFundId();

    expect(retrievedFundId).to.equal(fundId);
  });

  /**
   * Test case for getting the current balance.
   */
  it("should get the current balance correctly", () => {
    const initialBalance = fund.getBalance();
    const retrievedBalance = fund.getBalance();

    expect(retrievedBalance).to.equal(initialBalance);
  });

  /**
   * Test case for performing a transaction and updating the balance.
   */
  it("should perform a transaction and update balance correctly", () => {
    const initialBalance = fund.getBalance();
    const amount = 100;

    const transaction = fund.doTransaction(amount);
    const newBalance = fund.getBalance();

    expect(transaction.oldBalance).to.equal(initialBalance);
    expect(transaction.newBalance).to.equal(initialBalance + amount);
    expect(newBalance).to.equal(initialBalance + amount);
  });
});
