import { Component, OnInit } from '@angular/core';
import { plug } from '../public/login/initPlugings';


@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    plug();
  }

}
