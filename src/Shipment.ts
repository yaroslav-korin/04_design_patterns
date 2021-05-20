import {TShipmentState} from "./MockGui";
import Shipper, {IShipper} from "./Shipper";

let idCounter = 0;

export enum ShipmentTypes {
    LETTER = 'letter',
    PACKAGE = 'package',
    Oversized = 'oversized',
};

export type TShipment = ShipmentTypes.LETTER | ShipmentTypes.PACKAGE | ShipmentTypes.Oversized;

export interface IShipment {
    getShipmentId(): number,
    ship(): string,
};

export class Shipment implements IShipment {
    private readonly _state: TShipmentState;
    private shipper: IShipper = new Shipper();

    constructor(_state: TShipmentState) {
        this._state = {..._state, shipmentId: this.getShipmentId()};
    };

    get state() {
        return this._state;
    };

    private getCost(): number {
        const {fromZipCode} = this._state;

        // @ts-ignore
        return this.shipper.getCost(fromZipCode, this.type);
    };

    getShipmentId() {
        const id = idCounter;
        idCounter++;

        return id;
    };

    ship() {
        const {shipmentId, fromZipCode, fromAddress, toZipCode, toAddress} = this._state;
        const cost = this.getCost();

        return `Shipment with the ID ${shipmentId} will be picked up from ${fromAddress}, ${fromZipCode} and shipped to ${toAddress}, ${toZipCode}
                Cost = ${cost}`;
    };
};

export class Letter extends Shipment {
    type: TShipment = ShipmentTypes.LETTER;
};

export class Package extends Shipment {
    type: TShipment = ShipmentTypes.PACKAGE;
};

export class Oversized extends Shipment {
    type: TShipment = ShipmentTypes.Oversized;
};
