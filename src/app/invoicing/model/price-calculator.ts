import { Tax } from './invoice';

export class CalcRequest {
    net?: number;
    gross?: number;
    tax: Tax;
}

export interface ItemPrice {
    net: number;
    gross: number;
    taxValue: number;
    tax: Tax;
}

export class PriceCalculator {
    calculate(request: CalcRequest): ItemPrice {
        if(request.net != null) {
            const gross = request.net * (1 + request.tax);
            const taxValue = gross - request.net;
            const itemPrice: ItemPrice = {
                net: request.net,
                gross: round(gross, 2),
                taxValue: round(taxValue, 2),
                tax: request.tax 
            }
            return itemPrice;
        }
        else {
            const net = request.gross / (1 + request.tax);
            const taxValue = request.gross - net;
            const itemPrice: ItemPrice = {
                net: round(net, 2),
                gross: request.gross,
                taxValue: round(taxValue, 2),
                tax: request.tax 
            }
            return itemPrice;
        }
    }
}

function round(x: number, precision = 0): number {
    const multiplier: number = 10 ** precision;
    return Math.round(x * multiplier) / multiplier;
}