export class ProductCategory {
    constructor(category: string) {
        this.Value = category;
        this.Type = "";
        //this.IsProductCategoryType = product.IsProductCategoryType;
    };

    Value: string;
    Type: string;
    IsSelected: boolean = false;
    IsDisabled: boolean = false;
    //IsProductCategoryType: boolean = false;
}

