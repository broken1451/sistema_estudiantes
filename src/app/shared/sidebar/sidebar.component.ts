import { Component, DoCheck, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu, User } from 'src/app/modules/public/interfaces/login.interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, DoCheck {

  public usuario!: any;
  public readonly userService = inject(AuthService);
  public menu!: Menu[];
  public usuario$!: Subscription;

  constructor() {}
  
  ngDoCheck(): void {
   this.usuario =  JSON.parse(localStorage.getItem('userLoged')!)
  }


  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('userLoged')!);
    console.log(this.usuario);
    this.menu = JSON.parse(localStorage.getItem('menu')!);
  }


  logout(){
    this.userService.logout();
    this.usuario = null;;
  }
}
