import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/modules/public/interfaces/login.interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public usuario!: User;
  private readonly userService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.usuario = this.userService.usuario;
  }

}
