import { IFacetTerms } from './IFacetTerms'
export interface ISearchFilter {
    Terms: IFacetTerms[];
    Facet: string;
}