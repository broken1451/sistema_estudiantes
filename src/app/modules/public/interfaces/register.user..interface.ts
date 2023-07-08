export interface RegisterUser {
    email?:        string;
    username?:     string;
    name?:     string;
    nro_identity?: string;
    password?:     string;
    password2?:    string;
    roles?: string[];
}


export interface UpdatedUser {
    email?:        string;
    username?:     string;
    name?:     string;
    nro_identity?: string;
    password?:     string;
    password2?:    string;
    roles?: string[];
}
