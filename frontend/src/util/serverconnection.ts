import { Trader } from "../model/trader.js";

export class ServerConnection {

    public getAllTraders(fn:(t:any) => void):void {

        let traders:Trader[] = [];
        //De URL waar data wordt opgevraagd. Wordt opgeslagen in een Request object.
        const myRequest = new Request("http://127.0.0.1:4001/traders");

        //Via de functie fetch en het Request object wordt geprobeerd om data op te vragen
        fetch(myRequest)
            //Geef aan dat het antwoord vn de server een json formaat heeft
            .then(response => response.json())
            //Parse de data die door de server verstuurd is
            .then(data => {
                //Voer hier de nodige acties uit op de data van de server
                fn(data);                
            })
            .catch(console.error);
    }

    public doTransaction(id:number, amount:number, fn:(t:any) => void):void {

        const myRequest = new Request("http://127.0.0.1:4001/trader/transaction/"+id+"/"+amount);

        //Via de functie fetch en het Request object wordt geprobeerd om data op te vragen
        fetch(myRequest, {method:'POST'})
            //Geef aan dat het antwoord vn de server een json formaat heeft
            .then(response => response.json())
            //Parse de data die door de server verstuurd is
            .then(data => {
                //Voer hier de nodige acties uit op de data van de server
                fn(data);                
            })
            .catch(console.error);
    }
}