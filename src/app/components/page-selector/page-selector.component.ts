import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-page-selector',
  standalone: true,
  imports: [CommonModule,MatListModule],
  templateUrl: './page-selector.component.html',
  styleUrl: './page-selector.component.scss'
})
export class PageSelectorComponent{
  @Input() items:Array<string> = [];
  @Output() change: EventEmitter<string> = new EventEmitter();

  onChange(item: string){
    this.change.emit(item);
  }
}
