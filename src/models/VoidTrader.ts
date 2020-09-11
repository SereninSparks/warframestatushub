import {VoidTraderInventoryItem} from './VoidTraderInventoryItem';

export interface VoidTrader {
    id: string;
    activation: string;
    expiry: string;
    character: string;
    location: string;
    inventory: VoidTraderInventoryItem[],
    psId: string;
    active: boolean;
    startString: string;
    endString: string;
}
