export class SearchProduct {
    
    constructor(product: any) {
        this.SEOStatus = product.SEOStatus;
        this.ProductStatus = product.ProductStatus;
        this.Name = product.Name;
        this.PublishDateUtc = product.PublishDateUtc;
        this.PrimaryImageUrl = product.PrimaryImageUrl;
        this.ExternalProductId = product.ExternalProductId;
        this.LastUpdatedBy = product.LastUpdatedBy;
        this.CanBlkPblsh = product.CanBlkPblsh;
        this.CreateDateUtc = product.CreateDateUtc;
        this.LastUpdateDateUtc = product.LastUpdateDateUtc;
    };

    SEOStatus: string;
    ProductStatus: string;
    Name: string;
    PublishDateUtc: string;
    PrimaryImageUrl: string;
    ExternalProductId: string;
    LastUpdatedBy: string;
    CanBlkPblsh: boolean;
    CreateDateUtc: string;
    LastUpdateDateUtc: string;
    IsSelected: boolean = false;
}