import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { ComponentInfo } from '../../types/component-info';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [CommonModule,MatListModule],
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss'
})

export class CollectionListComponent {
  @Input() items:Array<ComponentInfo> = [];
    
  onDrag(event:any,id:any){
    event.dataTransfer.setData("id", id);
  }
}
