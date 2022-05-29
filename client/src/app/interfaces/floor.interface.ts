export interface iFloor{
    id: string;
    name: string;
    map: string;
}

export interface iFlooreReq{
    message: string;
    floor: iFloor[];
}