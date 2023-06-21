import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/modules/public/interfaces/login.interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public usuario!: User;
  private readonly userService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.usuario = this.userService.usuario;
  }

}
