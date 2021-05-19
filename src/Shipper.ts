import {TShipmentState} from "./MockGui";
import {ShipmentTypes, TShipment} from "./Shipment";

export interface IShipper {
    getCost(shipment: TShipmentState, shipmentType: TShipment): number;
}


export default class Shipper implements IShipper {
    private shippersIndexes = {
        airEastShipper: [1, 2, 3],
        chicagoSprintShipper: [4, 5, 6],
        pacificParcelShipper: [7, 8, 9],
    }

    getCost(shipment: TShipmentState, shipmentType: TShipment) {
        const {weight, fromZipCode} = shipment;

        let shipper: BaseShipper;
        const fromZipCodeFirstChar: number = Number(fromZipCode[0]);

        const {airEastShipper, chicagoSprintShipper, pacificParcelShipper} = this.shippersIndexes;

        switch (true) {
            case airEastShipper.includes(fromZipCodeFirstChar):
                shipper = new AirEastShipper(weight, shipmentType);
                break;
            case chicagoSprintShipper.includes(fromZipCodeFirstChar):
                shipper = new ChicagoSprintShipper(weight, shipmentType);
                break;
            case pacificParcelShipper.includes(fromZipCodeFirstChar):
                shipper = new PacificParcelShipper(weight, shipmentType);
                break;
            default:
                shipper = new AirEastShipper(weight, shipmentType)
        }

        return shipper.calcPrice()
    }
}

type TPriceTypes = {
    [ShipmentTypes.LETTER]: number,
    [ShipmentTypes.PACKAGE]: number,
    [ShipmentTypes.Oversized]: number,
}

abstract class BaseShipper {
    protected shipmentWeight: number;
    protected shipmentType: TShipment;

    constructor(shipmentWeight: number, shipmentType: TShipment) {
        this.shipmentWeight = shipmentWeight;
        this.shipmentType = shipmentType;
    }

    abstract calcPrice(): number;
}

class AirEastShipper extends BaseShipper {
    private readonly _pricePerOunce: TPriceTypes = {
        [ShipmentTypes.LETTER]: 0.39,
        [ShipmentTypes.PACKAGE]: 0.25,
        [ShipmentTypes.Oversized]: 10,
    }

    calcPrice(): number {
        switch (this.shipmentType) {
            case ShipmentTypes.LETTER:
                return this.shipmentWeight * this._pricePerOunce[ShipmentTypes.LETTER];
            case ShipmentTypes.PACKAGE:
                return this.shipmentWeight * this._pricePerOunce[ShipmentTypes.PACKAGE];
            case ShipmentTypes.Oversized:
                return this._pricePerOunce[ShipmentTypes.Oversized] + this.shipmentWeight * this._pricePerOunce[ShipmentTypes.PACKAGE];
        }
    }
}

class ChicagoSprintShipper extends BaseShipper {
    private readonly _pricePerOunce: TPriceTypes = {
        [ShipmentTypes.LETTER]: 0.42,
        [ShipmentTypes.PACKAGE]: 0.20,
        [ShipmentTypes.Oversized]: 0,
    }

    calcPrice(): number {
        switch (this.shipmentType) {
            case ShipmentTypes.LETTER:
                return this.shipmentWeight * this._pricePerOunce[ShipmentTypes.LETTER];
            case ShipmentTypes.PACKAGE:
                return this.shipmentWeight * this._pricePerOunce[ShipmentTypes.PACKAGE];
            case ShipmentTypes.Oversized:
                return this._pricePerOunce[ShipmentTypes.Oversized]
        }
    }
}

class PacificParcelShipper extends BaseShipper {
    private readonly _pricePerOunce: TPriceTypes = {
        [ShipmentTypes.LETTER]: 0.51,
        [ShipmentTypes.PACKAGE]: 0.19,
        [ShipmentTypes.Oversized]: 0.02
    }

    calcPrice(): number {
        switch (this.shipmentType) {
            case ShipmentTypes.LETTER:
                return this.shipmentWeight * this._pricePerOunce[ShipmentTypes.LETTER];
            case ShipmentTypes.PACKAGE:
                return this.shipmentWeight * this._pricePerOunce[ShipmentTypes.PACKAGE];
            case ShipmentTypes.Oversized:
                return this.shipmentWeight * (this._pricePerOunce[ShipmentTypes.PACKAGE] + this._pricePerOunce[ShipmentTypes.Oversized]);
        }
    }
}
