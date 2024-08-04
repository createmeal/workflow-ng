import { Component } from '@angular/core';
import { DesignerComponent } from '../../components/designer/designer.component';

@Component({
  selector: 'app-designer-page',
  standalone: true,
  imports: [DesignerComponent],
  templateUrl: './designer-page.component.html',
  styleUrl: './designer-page.component.scss'
})
export class DesignerPageComponent {

}
