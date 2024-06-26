import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [],
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss'
})
export class CollectionItemComponent {
  title: string = "component title";
  
}
