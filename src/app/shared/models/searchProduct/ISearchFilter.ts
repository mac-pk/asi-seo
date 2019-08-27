import {IFacetTerms} from './IFacetTerms'
export interface ISearchFilter{
    id: number;
    isBool: boolean;
    isDefault:boolean;
    SeeAll:boolean;
    facetTerms:IFacetTerms[];
    name:string;
}