import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaskModel } from '../models/tasks-model';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class TaskManagementService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private reloadData = new BehaviorSubject(true);
  public apiUrl = 'http://localhost:5000/tasks'
  constructor(private http: HttpClient) { }

  taskSyncService(){
    return this.reloadData.asObservable()
  }

  changeReloadData(){
    this.reloadData.next(true);
  }

  resetReloadData(){
    this.reloadData.next(false);
  }

  getTasks(){
    return this.http.get<TaskModel>(this.apiUrl);
  }

  addTasks(payload: any){
    return this.http.post(`${this.apiUrl}`, payload);
  }

  patchReminder(id: number, payload: boolean){
    return this.http.patch(`${this.apiUrl}/${id}`, payload, this.httpOptions);
  }

  deleteTasks(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
