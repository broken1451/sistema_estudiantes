import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../public/service/auth.service';
import { ResponseUsers, User } from '../../public/interfaces/user.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public desde: number = 0;
  public usersBack!: User[];
  public user!: User;

  private readonly userService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.getUser(String(this.desde));
    this.user = this.userService.usuario;
  }

  async getUser(desde?: string) {
    const resp  = await this.userService.getUsers(Number(desde)).catch(err => {});
    console.log({resp});
    this.usersBack = resp?.users!;
  }


  prev() {
    if (this.desde > 0) {
      this.desde = this.desde - 1;
      this.getUser(String(this.desde))
    }
    if (this.desde <= 0) {
      this.desde = 0;
      this.getUser(String(this.desde))
      return;
    }

  }

  next(){
    this.desde = this.desde + 1;
    this.getUser(String(this.desde))
  }

  delete(user: User){
    console.log(user);
  }
}
