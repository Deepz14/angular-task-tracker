import { Component, OnInit } from '@angular/core';
import { TaskManagementService } from '../../services/task-management.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private taskService: TaskManagementService) { }

  ngOnInit(): void {
  }

  toDefaultState(){
      this.taskService.changeReloadData();
  }

}
