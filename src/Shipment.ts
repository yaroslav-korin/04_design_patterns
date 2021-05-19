import {TShipmentState} from "./MockGui";
import {IShipper} from "./Shipper";

let idCounter = 0;

export enum ShipmentTypes {
    LETTER = 'letter',
    PACKAGE = 'package',
    Oversized = 'oversized',
}

export type TShipment = ShipmentTypes.LETTER | ShipmentTypes.PACKAGE | ShipmentTypes.Oversized

interface IShipment {
    getShipmentId(): number,
    ship(): string,
}

export abstract class Shipment implements IShipment {
    private readonly state: TShipmentState;
    private shipper: IShipper;

    constructor(state: TShipmentState, shipper: IShipper) {
        this.state = {...state, shipmentId: this.getShipmentId()};
        this.shipper = shipper;
    }

    private getCost(): number {
        const {fromZipCode} = this.state

        // @ts-ignore
        return this.shipper.getCost(fromZipCode, this.type)
    }

    getShipmentId() {
        const id = idCounter;
        idCounter++;

        return id;
    }

    ship() {
        const {shipmentId, fromZipCode, fromAddress, toZipCode, toAddress} = this.state
        const cost = this.getCost()

        return `Shipment with the ID ${shipmentId} will be picked up from ${fromAddress}, ${fromZipCode} and shipped to ${toAddress}, ${toZipCode}
                Cost = ${cost}`
    }
}

export class Letter extends Shipment {
    type: TShipment = ShipmentTypes.LETTER;
}

export class Package extends Shipment {
    type: TShipment = ShipmentTypes.PACKAGE;
}

export class Oversized extends Shipment {
    type: TShipment = ShipmentTypes.Oversized;
}
