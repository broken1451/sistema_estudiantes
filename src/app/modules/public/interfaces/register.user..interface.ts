export interface RegisterUser {
    email?:        string;
    username?:     string;
    name?:     string;
    nro_identity?: string;
    password:     string;
    password2?:    string;
    agree?:        boolean;
    roles?: string[];
}
