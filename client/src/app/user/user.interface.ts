export interface iUser {
    email: string;
    password: string;
    fisrtName: string;
    lastName: string
}

export interface iUserReq {
    user: iUser;
    token: string
}