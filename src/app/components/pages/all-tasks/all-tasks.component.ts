import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule, CommonModule,PageTitleComponent,TaskListComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})
export class AllTasksComponent implements OnInit {
  newTask="";
  initialTaskList:any[]=[];
  taskList:any[]=[];


  constructor(private httpService: HttpService,private stateService:StateService){}

  ngOnInit(){

    this.stateService.searchSubject.subscribe((value)=>{
      console.log("search",value)
      if(value){
        this.taskList=this.initialTaskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase()))
      }else{
        this.taskList=this.initialTaskList;
      }
    })

    this.getAllTasks();
    
  }

  addTask(){
    console.log('task added',this.newTask)
    this.httpService.addTask(this.newTask).subscribe(()=>{
      this.newTask="";
      this.getAllTasks();
    })
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result:any)=>{
      this.taskList=this.initialTaskList=result;
    })
  }

  onComplete(task:any){
    console.log("complete",task)
    this.httpService.updateTask(task).subscribe(()=>{})
    this.getAllTasks();
  }
  onImportant(task:any){
    console.log("important",task)
    this.httpService.updateTask(task).subscribe(()=>{})
    this.getAllTasks();
  }

 
}
