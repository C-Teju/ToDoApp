import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  searchControl=new FormControl();
 
  constructor(private stateService:StateService){}

  ngOnInit() {
    
    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((value)=>{
     
      this.stateService.searchSubject.next(value || "")
    });
  }
}
