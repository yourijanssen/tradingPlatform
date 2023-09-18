import * as tssinon from "ts-sinon";
import { TraderService } from "../src/models/traderService";
import { assert, expect } from "chai";
import { app, initTraderController } from "../src/server";
import request, { Response } from "supertest";
import { initFundStub } from "./test-helpers/daoFundStub";
import { initUserStub } from "./test-helpers/daoUserStub";

/**
 * End-to-end (E2E) tests for the TraderController.
 */
describe("TraderController E2E tests", () => {
  // Create a Sinon sandbox
  const sandbox = tssinon.default.createSandbox();
  let traderService: TraderService | null = null;
  let daoUserStub = null;
  let daoFundStub = null;
  let spy = null;

  /**
   * Set up before each test case.
   */
  beforeEach(function () {
    daoUserStub = initUserStub();
    daoFundStub = initFundStub();

    traderService = new TraderService(daoUserStub, daoFundStub);

    initTraderController(traderService);

    spy = tssinon.default.spy(traderService, "getTraderById");
  });

  it("should return a status of 200 and correct data for an API call on: /trader/1", async () => {
    let res: Response = await request(app).get("/trader/1");
    expect(res.statusCode).equals(200);
    expect(JSON.stringify(res.body)).equals(
      '{"fund":{"balance":1000,"fundId":1},"traderId":1}'
    );
  });

  it("should return a status of 200 and correct data for an API call on: /traders", async () => {
    let res: Response = await request(app).get("/traders");
    expect(res.statusCode).equals(200);
    expect(JSON.stringify(res.body)).equals(
      '[{"fund":{"balance":1000,"fundId":1},"traderId":1},' +
        '{"fund":{"balance":1000,"fundId":1},"traderId":2},' +
        '{"fund":{"balance":1000,"fundId":1},"traderId":3}]'
    );
  });

  /**
   * Clean up after each test case.
   */
  afterEach(function () {
    sandbox.restore();
    tssinon.default.restore();
  });
});
