import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { StepEntity } from '../../entities/step.entity';

@Component({
  selector: 'app-step-selector',
  standalone: true,
  imports: [CommonModule,MatListModule],
  templateUrl: './step-selector.component.html',
  styleUrl: './step-selector.component.scss'
})

export class StepSelectorComponent {
  @Input() items:Array<StepEntity> = [];
    
  onDrag(event:any,id:any){
    event.dataTransfer.setData("id", id);
  }
}
