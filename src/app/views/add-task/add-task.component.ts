import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskManagementService } from '../../services/task-management.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private taskService: TaskManagementService) { }

  addTaskForm = new FormGroup({
    text: new FormControl('', [Validators.required]),
    day: new FormControl('', [Validators.required]),
    reminder: new FormControl(false, [Validators.required])
  });

  ngOnInit(): void {
  }

  resetFormData(){
    this.addTaskForm.reset();
    this.addTaskForm.patchValue({
      text: '',
      day: '',
      reminder: false
    });
  }

  submitTasks(){
    if (this.addTaskForm.invalid){
      alert('Form Fields cannot be Empty!');  
      return;
    }
    this.taskService.addTasks(this.addTaskForm.getRawValue()).subscribe((data) => {
      this.taskService.changeReloadData();
      this.resetFormData();
    })
  }

}
