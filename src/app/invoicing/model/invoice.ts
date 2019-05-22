import { TextAst } from '@angular/compiler';

export interface InvoiceItem {
    name: string;
    quantity: number;
    unit: Unit;
    net?: number;
    gross?: number;
    tax: Tax;
}

export enum Unit {
    service = 'service',
    hour = 'h',
    goods = 'good'
}

export enum Tax {
    t23 = 0.23,
    t8 = 0.08,
    t5 = 0.05
}

export class InvoiceItemFactory {
    createNewInvoiceItem(): InvoiceItem {
        return {
            name: '',
            quantity: 1,
            unit: Unit.service,
            tax: Tax.t23
        }
    }
}