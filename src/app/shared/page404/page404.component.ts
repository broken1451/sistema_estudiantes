import { Component, OnInit } from '@angular/core';
import { plug } from 'src/app/modules/public/login/initPlugings';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {


  ngOnInit(): void {
    plug();
  }
}
