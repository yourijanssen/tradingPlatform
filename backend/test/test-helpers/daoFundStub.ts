import { DaoFund } from "../../src/database/DaoFund";
import { Fund } from "../../src/models/fund";
import * as tssinon from "ts-sinon";

/**
 * Initialize the DaoFund stub.
 * @returns {tssinon.StubbedInstance<DaoFund>} The stubbed DaoFund instance.
 */
export function initFundStub(): tssinon.StubbedInstance<DaoFund> {
  const daoFund: DaoFund = new DaoFund();
  const daoFundStub = tssinon.stubObject<DaoFund>(daoFund);
  const fund: Fund = new Fund();
  fund.setFundId(1);
  fund.doTransaction(1000);
  daoFundStub.getFundForTrader.returns(Promise.resolve(fund));
  return daoFundStub;
}
