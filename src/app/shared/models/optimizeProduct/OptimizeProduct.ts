import { IProductKeywords } from './IProductKeywords';
import { ProductCategory } from './ProductCategory';

export class OptimizeProduct {
    constructor(externalProductId: string,
        companyId: number,
        name: string,
        description: string,
        summary: string
        ) {
        this.ExternalProductId = externalProductId;
        this.CompanyId = companyId;
        this.Name = name;
        this.Description = description;
        this.Summary = summary;
        // this.ProductThemes = product.ProductThemes;
        // this.ProductKeywords = product.ProductKeywords;
        // this.ProductCategories = product.ProductCategories;
    };
    
    ExternalProductId: string;
    CompanyId: number;
    Name: string;
    Description: string;
    Summary: string;
    ProductThemes: string[];
    ProductKeywords: IProductKeywords[];
    ProductCategories: ProductCategory[];
    SeoKeywords: string[] = [];
    SEOStatus: string;
    Number: string = "";
    PrimaryImageUrl: string = "";
}