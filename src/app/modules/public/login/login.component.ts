import { Component, OnInit } from '@angular/core';
import { plug } from './initPlugings';
import { OptLogin } from '../interfaces/login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public optionsToLogin: OptLogin[] =  [
    {
      title: 'Correo', value: 'email'
    },
    {
      title: 'Usuario', value: 'username'
    },
    {
      title: 'Identificacion', value: 'nro_identity'
    },
  ]

  constructor() {}

  ngOnInit(): void {
    plug();
  }



}
