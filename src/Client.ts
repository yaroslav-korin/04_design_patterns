import MockGui, {TShipmentState} from "./MockGui";
import {IShipment, Shipment} from "./Shipment";
import ShipmentDecorator from "./ShipmentDecorator";

export class Client {
    private shipment: IShipment;

    constructor(Gui: MockGui) {
        const guiState: TShipmentState = Gui.state;
        this.shipment = new ShipmentDecorator(new Shipment(guiState))
        this.onShip()
    }

    private onShip(): string {
        return this.shipment.ship()
    }
}

