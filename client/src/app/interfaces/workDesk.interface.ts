export interface iWorkDesk{
    x: string;
    y: string;
    floorId: string;
}

export interface iWorkDeskReq{
    message: string;
    workdesk: iWorkDesk[];
}