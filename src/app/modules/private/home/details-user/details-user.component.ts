import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss']
})
export class DetailsUserComponent implements OnInit, OnChanges{


  @Input() user: any 

  constructor(){}

  ngOnInit(): void {
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('hereeee details',changes['user'].currentValue);
    this.user = changes['user'].currentValue
  }
 

}
