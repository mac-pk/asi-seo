import { FacetTerms } from './FacetTerms'
export class SearchFilter {
    constructor(facet: string, terms: any[]) {
        this.Facet = facet;
        this.FacetId = facet.replace(/\s/g, "_");
        this.Terms = terms.map(x => new FacetTerms(x.Count, x.Term, x.ParentTerm));
    }
    Terms: FacetTerms[];
    Facet: string;
    FacetId: string;
    SeeAll: boolean = false;
}