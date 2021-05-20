import {IShipment, Shipment} from "./Shipment";

export default class ShipmentDecorator implements IShipment{
    private wrappee: Shipment;

    constructor(shipment: Shipment) {
        this.wrappee = shipment;
    }

    ship(): string {
        const {marks} = this.wrappee.state

        return `${this.wrappee.ship()} ${marks.map(mark => `\n**${mark.toUpperCase()}**`)}`
    }

    getShipmentId(): number {
        return this.wrappee.getShipmentId()
    }
}
