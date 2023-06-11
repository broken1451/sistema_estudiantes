export interface ResponseUsers {
    users:      User[];
    countsUser: number;
}

export interface User {
    _id:          string;
    name:         string;
    email:        string;
    img:          string;
    username:     string;
    nro_identity: string;
    password:     string;
    roles:        string[];
    isActive:     boolean;
    retry:        number;
    created:      Date;
    __v:          number;
}
