export class ProductCategory {
    constructor(product: any) {
        this.Code = product.Code;
        this.Description = product.Description;
        this.Name = product.Name;
        this.DisplayName = product.DisplayName;
        this.ParentCategoryCode = product.ParentCategoryCode;
        this.ProductTypeCode = product.ProductTypeCode;
        this.IsProductTypeSpecific = product.IsProductTypeSpecific;
        this.IsAllowsAssign = product.IsAllowsAssign;
        this.IsParent = product.IsParent;
        this.IsPrimary = product.IsPrimary;
        this.Value = product.Value;
        this.Type = product.Type;
    };

    Code: string;
    Description: string;
    Name: string;
    DisplayName: string;
    ParentCategoryCode: string;
    ProductTypeCode: string;
    IsProductTypeSpecific: boolean;
    IsAllowsAssign: string;
    IsParent: string;
    IsPrimary: string;
    Value: string;
    Type: string;
    IsSelected: boolean = false;
    IsDisabled: boolean = false;
    IsProductCategoryType: boolean = false;
}

