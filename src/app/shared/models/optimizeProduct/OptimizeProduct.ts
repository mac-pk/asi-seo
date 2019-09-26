import { IProductKeywords } from './IProductKeywords';
import { ProductCategory } from './ProductCategory';

export class OptimizeProduct {
    constructor(product: any) {
        this.ExternalProductId = product.ExternalProductId;
        this.CompanyId = product.CompanyId;
        this.Name = product.Name;
        this.Description = product.Description;
        this.Summary = product.Summary;
        this.ProductThemes = product.ProductThemes;
        this.ProductKeywords = product.ProductKeywords;
        this.ProductCategories = product.ProductCategories;
    };
    
    ExternalProductId: string;
    CompanyId: number;
    Name: string;
    Description: string;
    Summary: string;
    ProductThemes: string[];
    ProductKeywords: IProductKeywords[];
    ProductCategories: ProductCategory[];
    Number: string = "";
    PrimaryImageUrl: string = "";
}