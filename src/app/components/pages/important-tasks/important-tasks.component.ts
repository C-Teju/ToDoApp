import { Component } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent, FormsModule],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss'
})
export class ImportantTasksComponent {
  newTask="";
  taskList:any[]=[];


  constructor(private httpService: HttpService){}

  ngOnInit(){
    this.getAllTasks();
  }


  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result:any)=>{
      this.taskList=result.filter((x:any)=>x.important==true);
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
