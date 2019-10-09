export class ProductCategory {
    constructor(category: string) {
        this.Value = category;
        this.Type = "";
    };

    Value: string;
    Type: string;
    IsSelected: boolean = false;
    IsDisabled: boolean = false;
}

