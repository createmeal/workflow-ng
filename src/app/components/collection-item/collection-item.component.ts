import { Component } from '@angular/core';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [],
  templateUrl: './collection-item.component.html',
  styleUrl: './collection-item.component.scss'
})
export class CollectionItemComponent {
  title: string = "component title";
  
}
