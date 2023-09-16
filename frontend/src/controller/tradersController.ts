import { Trader } from "../model/trader.js";
import { TraderService } from "../model/traderservice.js";
import { TraderNS } from "./traderController.js";

export namespace TradersNS {
    export class TradersController {

        private static objTradersController: TradersController;
        private traderService: TraderService;

        private constructor() {
            this.traderService = new TraderService([]);
        }

        public static getInstance(): TradersController {
            if (TradersController.objTradersController == null) {
                TradersController.objTradersController = new TradersController();
            }
            return TradersController.objTradersController;
        }

        public loadTraders(): void {
            this.traderService.loadTraders((traders => {
                UserInterface.displayTraders(traders);
            }));
        }
    }

    export class UserInterface {

        public static displayTrader(trader: Trader): void {
            let traderSection: HTMLElement = document.getElementById("tradercontainer") as HTMLElement;

            while (traderSection.lastChild != null) {
                traderSection.removeChild(traderSection.lastChild);
            }

            if (traderSection != null) {
                if (trader.id == -1) {
                    traderSection.appendChild(document.createTextNode("No trader found!!!"));
                } else {
                    traderSection.appendChild(document.createTextNode("Trader " + trader.id));
                    traderSection.appendChild(document.createTextNode("Balance " + trader.balance));
                    let inputTransaction = document.createElement("input");
                    inputTransaction.type = "text";
                    inputTransaction.id = "balanceinput";
                    traderSection.appendChild(inputTransaction);
                    let buttonTransaction = document.createElement("button");
                    buttonTransaction.innerText = "submit";
                    buttonTransaction.addEventListener("click", function () { TraderNS.TraderController.getInstance().doTransaction(); });
                    traderSection.appendChild(buttonTransaction);
                }
            }
        }

        public static displayTraders(traders: Trader[]): void {
            let traderTable: HTMLTableElement = document.getElementById("tradertable") as HTMLTableElement;
            if (traderTable != null) {
                while (traderTable.rows.length > 1) {
                    traderTable.deleteRow(-1);
                }

                for (let index in traders) {
                    UserInterface.createRowTrader(traders[index], traderTable);
                }
            }
        }

        private static createRowTrader(trader: Trader, traderTable: HTMLTableElement): void {
            let tableRow = traderTable.insertRow();
            let tableCellID = tableRow.insertCell(0);
            let tableCellBalance = tableRow.insertCell(1);
            let link = document.createElement("a");
            let linkText = document.createTextNode("" + trader.id);
            link.appendChild(linkText);
            link.title = "Trader " + trader.id;
            link.href = "http://localhost:8080/trader.html?id=" + trader.id;
            tableCellID.appendChild(link);
            tableCellBalance.appendChild(document.createTextNode("" + trader.balance));
        }
    }
}

TradersNS.TradersController.getInstance().loadTraders();
