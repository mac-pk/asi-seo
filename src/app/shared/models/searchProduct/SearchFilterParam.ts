export class SearchFilterParam {
    constructor(facet: string, term: string, child: string = '') {
        this.FacetName = facet;
        this.SearchTerm = term;
        if (child)
            this.ChildTerm = child;
    }
    FacetName: string;
    SearchTerm: string;
    ChildTerm: string;
}