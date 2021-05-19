import MockGui, {TShipmentState} from "./MockGui";
import {Shipment} from "./Shipment";

export class Client {
    private shipment: Shipment;

    constructor(Gui: MockGui) {
        const guiState: TShipmentState = Gui.state;
        this.shipment = new Shipment(guiState)
        this.onShip()
    }

    private onShip(): string {
        return this.shipment.ship()
    }
}

