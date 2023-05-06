export interface LoginRequest {
  email?: string;
  username?: string;
  nro_identity?: string;
  remember?: boolean
  password: string;
}

export interface OptLogin {
  title: string;
  value: string;
}

export interface LoginResponse {
  user?: User;
  token?: string;
  menu?: Menu[];
}

export interface Menu {
  titulo: string;
  icono: string;
  submenu: Submenu[];
}

export interface Submenu {
  titulo: string;
  url: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  img: string;
  username: string;
  nro_identity: string;
  password: string;
  roles: string[];
  isActive: boolean;
  retry: number;
  created: Date;
  __v: number;
}
