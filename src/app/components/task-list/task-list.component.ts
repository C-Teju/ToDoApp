import { CommonModule, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
 @Input() taskList:any=[];
 @Output() important=new EventEmitter<any>();
 @Output() complete=new EventEmitter<any>();

  markImportant(task:any){
    task.important=true;
    this.important.emit(task);
  
  }

  markComplete(task:any){
    task.completed=true;
    this.complete.emit(task);
  }

}
