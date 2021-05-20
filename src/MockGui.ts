export type TShipmentState = {
    shipmentId: number,
    toAddress: string,
    fromAddress: string,
    toZipCode: string,
    fromZipCode: string,
    weight: number,
    marks: string[],
};

export interface IMockGui {
    state: TShipmentState;
};

export default class MockGui implements IMockGui{
    private _state: TShipmentState = {
        shipmentId: 1,
        toAddress: 'Atlanta',
        fromAddress: 'London',
        toZipCode: '123',
        fromZipCode: '456',
        weight: 20,
        marks: []
    };

    get state(): TShipmentState {
        return this._state;
    };
};
