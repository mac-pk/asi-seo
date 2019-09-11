export class FacetTerms {
    constructor(count: number, term: string, parentTerm: string) {
        this.Count = count;
        this.Term = term;
        this.ParentTerm = parentTerm;
    }
    Count: number;
    Term: string;
    ParentTerm: string;
}