import { Component, ViewChild, ViewContainerRef, ComponentRef, ChangeDetectorRef, Injector } from '@angular/core';
import { StepComponent } from '../step/step.component';
import { StepEntity } from '../../entities/step.entity';
import { DrawFlowStepModel } from '../../models/drawflow-package-model';

@Component({
  selector: 'app-dynamic-container',
  standalone: true,
  template: '<ng-template #container></ng-template>'
})
export class StepRendererComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  renderComponent(stepEntity: StepEntity | DrawFlowStepModel) {
    this.container.clear();

    const componentRef: ComponentRef<StepComponent> = this.container.createComponent(StepComponent, { injector: this.injector });
    componentRef.instance.title = stepEntity.name;

    this.cdr.detectChanges();
    
    const html = (componentRef.location.nativeElement as HTMLElement).innerHTML;

    componentRef.destroy();
    return html;
  }
}