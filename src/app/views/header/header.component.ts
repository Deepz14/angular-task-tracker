import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showAddBtn = new BehaviorSubject(true);
  constructor() { }

  ngOnInit(): void {
  }

  toggleBtn(){
    this.showAddBtn.next(!this.showAddBtn.value);
  }

}
