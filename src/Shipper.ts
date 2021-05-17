import {TShipment} from "./MockGui";

class BaseShipper {
    get price(): number {
        // @ts-ignore
        return this._price;
    }
}

class AirEastShipper extends BaseShipper {
    private _price: number;

    constructor() {
        super();
        this._price = 39;
    }
}

class ChicagoSprintShipper extends BaseShipper {
    private _price: number;

    constructor() {
        super();
        this._price = 42;
    }
}

class PacificParcelShipper extends BaseShipper {
    private _price: number;

    constructor() {
        super();
        this._price = 51;
    }
}

interface IShipper {
    getCost(shipment: TShipment): number;
}

export default class Shipper implements IShipper {
    private shippersIndexes = {
        airEastShipper: [1, 2, 3],
        chicagoSprintShipper: [4, 5, 6],
        pacificParcelShipper: [7, 8, 9],
    }

    getCost(shipment: TShipment) {
        let shipper: BaseShipper;
        const fromZipCodeFirstChar: number = Number(shipment.fromZipCode[0]);

        const {airEastShipper, chicagoSprintShipper, pacificParcelShipper} = this.shippersIndexes;

        switch (true) {
            case airEastShipper.includes(fromZipCodeFirstChar):
                shipper = new AirEastShipper();
                break;
            case chicagoSprintShipper.includes(fromZipCodeFirstChar):
                shipper = new ChicagoSprintShipper();
                break;
            case pacificParcelShipper.includes(fromZipCodeFirstChar):
                shipper = new PacificParcelShipper();
                break;
            default:
                shipper = new AirEastShipper()
        }

        return shipper.price
    }
}
