import { Component } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
@Component({
  selector: 'app-step',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {
  title: string = "component title";  
  description: string = "component description";
}
