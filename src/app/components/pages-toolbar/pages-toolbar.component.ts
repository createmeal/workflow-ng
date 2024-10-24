import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-pages-toolbar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './pages-toolbar.component.html',
  styleUrl: './pages-toolbar.component.scss'
})
export class PagesToolbarComponent {
  @Input() tabs: string[] = [];
  onDbClick(event: Event){
    console.log("ok");
  }
}
