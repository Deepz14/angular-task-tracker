import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskManagementService } from '../../services/task-management.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: any
  reloadData = new BehaviorSubject(true);
  taskSubs$ = new Subscription;
  faTimes = faTimes;
  constructor(private taskServices: TaskManagementService) { }

  ngOnInit(): void {
    this.taskSubs$ = this.taskServices.taskSyncService().subscribe(data => {
      if (data){
        this.fetchTaskData()
        this.taskServices.resetReloadData()
      }
    })
  }

  fetchTaskData(){
    this.taskServices.getTasks().subscribe((res) => {
      console.log(res);
      this.tasks = res;
    })
  }

  deleteTask(id: number){
    this.taskServices.deleteTasks(id).subscribe((res) => {
      this.fetchTaskData();
    })
  }

  toggleRemainder(task: any){
    task.reminder = !task.reminder;
    this.taskServices.patchReminder(task.id, task).subscribe((res) => {
      this.fetchTaskData();
    })
  }

  ngOnDestroy(){
    this.taskSubs$.unsubscribe()
  }

}
