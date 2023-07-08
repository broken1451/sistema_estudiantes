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
    created:      Date | string;
    __v:          number;
}

export interface Menu {
    titulo:  string;
    icono:   string;
    submenu: Submenu[];
}

export interface Submenu {
    titulo: string;
    url:    string;
}
