export interface iOffice{
    _id: string;
    name: string;
}

export interface iOfficeReq{
    message: string;
    office: iOffice[];
}