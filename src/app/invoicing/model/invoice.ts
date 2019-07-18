import { TextAst } from '@angular/compiler';

export interface InvoiceSummary {
    net: number;
    gross: number;
    tax: number;
}

export class Invoice {
    general: General;
    client: Client
    items: InvoiceItem[];
}

export class General {
    issueDate: string;
    number: string;
    dueDate: string;
}

export class Client {
    companyName: string;
    address: string;
    zipCode: string;
    country: string;
    nip: string;
}

export interface InvoiceItem {
    id: string;
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
            id: uuid(),
            name: '',
            quantity: 1,
            unit: Unit.service,
            tax: Tax.t23
        }
    }
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
        return v.toString(16);
    });
}