import * as tssinon from "ts-sinon";
import { TraderService } from "../src/models/traderService";
import { expect } from "chai";
import { DayTrader, Investor, StockTrader } from "../src/models/trader";
import { initFundStub } from "./test-helpers/daoFundStub";
import { initUserStub } from "./test-helpers/daoUserStub";

/**
 * Integration tests for the TraderService.
 */
describe("TraderService Integration tests", () => {
  // Create a Sinon sandbox
  const sandbox = tssinon.default.createSandbox();

  // Initialize TraderService, DaoUser stub, DaoFund stub, and a spy
  let traderService: TraderService | null = null;
  let daoUserStub = null;
  let daoFundStub = null;
  let spy = null;

  /**
   * Set up before each test case.
   */
  beforeEach(function () {
    // Initialize DaoUser stub
    daoUserStub = initUserStub();
    // Initialize DaoFund stub
    daoFundStub = initFundStub();

    // Create an instance of TraderService with stubs
    traderService = new TraderService(daoUserStub, daoFundStub);

    // Create a spy to track method calls
    spy = tssinon.default.spy(traderService, "getTraderById");
  });

  /**
   * Test case for getting trader data with the id 1.
   */
  it("should get the correct data for the getTrader method using an id of 1", async () => {
    // Stub the getMetaDataForTrader method to resolve with [1, 1]
    daoUserStub.getMetaDataForTrader.returns(Promise.resolve([1, 1]));

    // Call the getTrader method and assert the result
    const actual = await traderService.getTrader(1);
    const expected = [{ fund: { balance: 1000, fundId: 1 }, traderId: 1 }];
    expect(actual).to.deep.equal(expected);
  });

  /**
   * Test case for getting all trader IDs.
   */
  it("should get the correct data for the getTraders method using id's 1, 2 and 3", async () => {
    // Provide known trader IDs
    let knownIds = [1, 2, 3];

    // Call the getAllTraderIDs method and assert the result
    const actual = await traderService.getAllTraderIDs(knownIds);
    const expected = [1, 2, 3];
    expect(actual).to.deep.equal(expected);
  });

  /**
   * Test case for getting the correct investor.
   */
  it("should get the correct data for type of Trader, in this case the Investor", async () => {
    // Stub the getMetaDataForTrader method to resolve with [1, 3]
    daoUserStub.getMetaDataForTrader.returns(Promise.resolve([1, 3]));

    // Call the getTrader method and assert the result type
    const actual = await traderService.getTrader(1);
    expect(actual[0]).to.be.an.instanceOf(Investor);
  });

  /**
   * Test case for getting the correct day trader.
   */
  it("should get the correct data for the type of Trader, in this case the DayTrader", async () => {
    // Stub the getMetaDataForTrader method to resolve with [1, 1]
    daoUserStub.getMetaDataForTrader.returns(Promise.resolve([1, 1]));

    // Call the getTrader method and assert the result type
    const actual = await traderService.getTrader(1);
    expect(actual[0]).to.be.an.instanceOf(DayTrader);
  });

  /**
   * Test case for getting the correct stock trader.
   */
  it("should get the correct data for the type of Trader, in this case the StockTrader", async () => {
    // Stub the getMetaDataForTrader method to resolve with [1, 2]
    daoUserStub.getMetaDataForTrader.returns(Promise.resolve([1, 2]));

    // Call the getTrader method and assert the result type
    const actual = await traderService.getTrader(1);
    expect(actual[0]).to.be.an.instanceOf(StockTrader);
  });

  /**
   * Clean up after each test case.
   */
  afterEach(function () {
    // Restore the Sinon sandbox
    sandbox.restore();

    // Restore ts-sinon stubs
    tssinon.default.restore();
  });
});
