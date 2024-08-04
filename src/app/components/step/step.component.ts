import { Component } from '@angular/core';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {
  title: string = "component title";
  
}
