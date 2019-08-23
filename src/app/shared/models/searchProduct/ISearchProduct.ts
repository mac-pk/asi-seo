
export interface ISearchProduct{
    id: number;
    companyId: number;
    statusCode:string;
    workflowStatusCode:string;
    workflowStatusStateCode:string;
    number:string;
    name:string;
    description:string;
    summary:string;
    publishDate:string;
    primaryImageUrl:string;
    reason_CD:string;
    xID:string;
    lastUpdatedBy:string;
    dataSource:string;
    productLockedFlag:string;
    canBlkPrcAdj:boolean;
    canBlkUpchAdj:boolean;
    canBlkConf:boolean;
    canBlkPblsh:boolean;
    canBlkUnPblsh:boolean;
    createDate:string;
    updateDate:string;
}