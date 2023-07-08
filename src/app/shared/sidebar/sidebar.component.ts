import { Component, OnInit, inject } from '@angular/core';
import { Menu, User } from 'src/app/modules/public/interfaces/login.interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public usuario!: any;
  public readonly userService = inject(AuthService);
  public menu!: Menu[];

  constructor() {}

  ngOnInit(): void {
    this.usuario = this.userService.usuario;
    this.menu = JSON.parse(localStorage.getItem('menu')!);
  }


  logout(){
    this.userService.logout();
    this.usuario = null;;
  }
}
