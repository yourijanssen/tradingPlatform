import { ServerConnection } from "../util/serverconnection.js";
import { Trader } from "./trader.js";

export class TraderService {

    constructor(private _traders: Trader[]) {

    }

    public loadTraders(callback: (t: Trader[]) => void): void {
        if (this._traders.length == 0) {
            let serCom: ServerConnection = new ServerConnection();
            serCom.getAllTraders((traders => {
                this.setTraders(traders);
                callback(this._traders);
            })
            );
        }
    }

    private setTraders(traders: any): void {
        for(let index in traders) {
            console.log(traders[index]);
            let trader:Trader = new Trader(traders[index]["traderId"], traders[index]["fund"]["balance"]);    
            this._traders.push(trader);
        }
    }

    public getTrader(id: number, callback: (t: Trader) => void): void {
        let trader: Trader = this.getTraderFromTraders(id);

        if (trader.id == -1) {
            let serCom: ServerConnection = new ServerConnection();
            serCom.getAllTraders((traders => {
                this.setTraders(traders);
                let trader = this.getTraderFromTraders(id);
                callback(trader);
            }));
            trader = this.getTraderFromTraders(id);
        } else {
            callback(trader);
        }
    }

    private getTraderFromTraders(id: number): Trader {
        let trader: Trader = new Trader(-1, -1);

        this._traders.forEach(_trader => {
            if (_trader.id == id) {
                trader = _trader;
                return;
            }
        });

        return trader;
    }

    public doTransaction(id:number, amount:number, callback: (t: Trader) => void): void {
        let serCom: ServerConnection = new ServerConnection();
        serCom.doTransaction(id, amount, (transaction => {
            let trader = this.getTraderFromTraders(id);
            console.log(transaction);
            if(transaction["_newBalance"] !== undefined) {
                trader.balance = transaction["_newBalance"];
            }
            callback(trader);
        }));
    }
}