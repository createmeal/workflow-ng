import { Component, ViewChild, ViewContainerRef, ComponentRef, ChangeDetectorRef, Injector } from '@angular/core';
import { StepComponent } from '../step/step.component';
import { ComponentInfo } from '../../types/component-info';

@Component({
  selector: 'app-dynamic-container',
  standalone: true,
  template: '<ng-template #container></ng-template>'
})
export class StepRendererComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  renderComponent(componentInfo: ComponentInfo) {
    this.container.clear();

    const componentRef: ComponentRef<StepComponent> = this.container.createComponent(StepComponent, { injector: this.injector });
    componentRef.instance.title = componentInfo.label;

    this.cdr.detectChanges();
    
    const html = (componentRef.location.nativeElement as HTMLElement).innerHTML;

    componentRef.destroy();
    return html;
  }
}