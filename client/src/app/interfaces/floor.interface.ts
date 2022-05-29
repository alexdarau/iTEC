export interface iFloor{
    id: string;
    name: string;
    map: string;
}

export interface iFloorReq{
    message: string;
    floor: iFloor[];
}