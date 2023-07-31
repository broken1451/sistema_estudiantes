import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/modules/public/interfaces/login.interface';
import { AuthService } from 'src/app/modules/public/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public usuario!: any;
  public termino: string = '';
  private readonly userService = inject(AuthService);

  constructor() {
    localStorage.removeItem('termino')
  }

  ngOnInit(): void {
    this.usuario = this.userService.usuario;
  }

  logout(){
    this.userService.logout();
    this.usuario = null;;
  }

 async buscar(termino: string) {
    if (termino.length == 0) {
      this.termino = '';
      localStorage.removeItem('termino');
      // localStorage.removeItem('users');
      return
    }
    console.log(termino);
    this.termino = termino;
    localStorage.setItem('termino', this.termino)
    const res = await this.userService.getUsersByTerm(this.termino).then((res) => {
      console.log({res: res.users     });
      localStorage.setItem('users', JSON.stringify(res.users));
    }).catch((err)=> {

    });
    // this.userService.termino = termino;
  }

}
