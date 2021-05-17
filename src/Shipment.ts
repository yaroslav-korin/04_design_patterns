import {TShipment} from "./MockGui";
import Shipper from "./Shipper";

let idCounter = 0;

interface IShipment {
    getShipmentId(): number,
    ship(): string,
}

export class Shipment implements IShipment {
    private readonly state: TShipment;

    constructor(state: TShipment) {
        this.state = {...state, shipmentId: this.getShipmentId()};
    }

    getShipmentId() {
        const id = idCounter;
        idCounter++;

        return id;
    }

    ship() {
        const {shipmentId, fromZipCode, fromAddress, toZipCode, toAddress} = this.state

        return `Shipment with the ID ${shipmentId} will be picked up from ${fromAddress}, ${fromZipCode} and shipped to ${toAddress}, ${toZipCode}
                Cost = ${new Shipper().getCost(this.state)}`
    }
}
