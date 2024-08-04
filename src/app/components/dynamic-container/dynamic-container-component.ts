import { Component, ViewChild, ViewContainerRef, ComponentRef, ChangeDetectorRef, Injector } from '@angular/core';
import { StepComponent } from '../step/step.component';

@Component({
  selector: 'app-dynamic-container',
  standalone: true,
  template: '<ng-template #container></ng-template>'
})
export class DynamicContainerComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {}

  renderComponent(title: string) {
    this.container.clear();

    const componentRef: ComponentRef<StepComponent> = this.container.createComponent(StepComponent, { injector: this.injector });
    componentRef.instance.title = title;

    this.cdr.detectChanges();
    
    const html = (componentRef.location.nativeElement as HTMLElement).innerHTML;

    componentRef.destroy();
    return html;
  }
}