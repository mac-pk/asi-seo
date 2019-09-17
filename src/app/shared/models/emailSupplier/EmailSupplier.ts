import { ISupplier } from '../searchSuppliers/ISearchSuppliers'
export class EmailSupplier {
    
    constructor(supplier: ISupplier) {
        this.To = supplier.EmailAddress;
    };

    To: string;
    Cc: string;
    Bcc: string;
    Subject: string;
    Body: string;
}