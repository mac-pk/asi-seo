export class SeoLogin{
    Asi: string;
    Username: string;
    Password: string;
}

export class SeoLoginResponse{
    AccessToken: string;
    TokenExpirationTime: string;
}

export class Supplier{
    CompanyId: number;
    AsiNumber: string;
    CompanyName : string;
    Address1 : string;
    Address2 : string;
    City : string;
    StateCode : string;
    PostalCode : string;
    County : string;
    CountryCode : string;
    PhoneNumber : string;
    EmailAddress : string;  
    MemberTypeCode : string;
    SupplierLevel: number;
    Premier : string;
    Replink : string;        
    Mapped : string;
    TLC : string;  
    Spotlight : string;
    API : string;
    HasNotes : boolean;       
}