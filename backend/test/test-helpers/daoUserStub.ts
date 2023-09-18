import { DaoUser } from "../../src/database/DaoUser";
import * as tssinon from "ts-sinon";

/**
 * Initialize the DaoUser stub.
 * @returns {tssinon.StubbedInstance<DaoUser>} The stubbed DaoUser instance.
 */
export function initUserStub(): tssinon.StubbedInstance<DaoUser> {
  const daoUser: DaoUser = new DaoUser();
  const daoUserStub = tssinon.stubObject<DaoUser>(daoUser);
  // Stub methods and return values
  daoUserStub.getTraderID.returns(Promise.resolve(1));
  daoUserStub.getAllTraderIDs.returns(Promise.resolve([1, 2, 3]));
  daoUserStub.getFundIdForTrader.returns(Promise.resolve(1));
  daoUserStub.getMetaDataForTrader.returns(Promise.resolve([1, 1]));
  return daoUserStub;
}
