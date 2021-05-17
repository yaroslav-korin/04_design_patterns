export type TShipment = {
    shipmentId: number,
    toAddress: string,
    fromAddress: string,
    toZipCode: string,
    fromZipCode: string,
    weight: number,
    marks: string[],
}

export interface IMockGui {
    state: TShipment
}

export default class MockGui implements IMockGui{
    private _state: TShipment = {
        shipmentId: 1,
        toAddress: 'Atlanta',
        fromAddress: 'London',
        toZipCode: '123',
        fromZipCode: '456',
        weight: 20,
        marks: []
    }

    get state() {
        return this._state
    }
}
