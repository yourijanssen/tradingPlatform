import { TraderService } from "../model/traderservice.js";
import { TradersNS } from "./tradersController.js";

export namespace TraderNS {
    export class TraderController {

        private static objTraderController: TraderController;
        private traderService: TraderService;

        private constructor() {
            this.traderService = new TraderService([]);
        }

        public static getInstance(): TraderController {
            if (TraderController.objTraderController == null) {
                TraderController.objTraderController = new TraderController();
            }
            return TraderController.objTraderController;
        }

        public loadTrader(): void {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const traderId = urlParams.get('id');
            if (traderId != null) {
                this.traderService.getTrader(+traderId, (trader => {
                    TradersNS.UserInterface.displayTrader(trader);
                }));
            }
        }

        public doTransaction():void {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const traderId = urlParams.get('id');
            let balanceInput: HTMLInputElement = document.getElementById("balanceinput") as HTMLInputElement;
            console.log(traderId + " " + balanceInput.value);
            if (traderId != null) {
                this.traderService.doTransaction(+traderId, +balanceInput.value, (trader => {
                    TradersNS.UserInterface.displayTrader(trader);
                }));
            }
        }
    }
}

TraderNS.TraderController.getInstance().loadTrader();