import { Component,ViewChild, ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { DynamicContainerComponent } from '../dynamic-container/dynamic-container-component';
import { StepComponent } from '../step/step.component';
import { StepSelectorComponent } from '../step-selector/step-selector.component';
import { SharedModule } from '../../shared/shared.module';

import Drawflow from 'drawflow';
import { ComponentInfo } from '../../types/component-info';
import { components } from '../../data/components';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [SharedModule,StepSelectorComponent],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.scss'
})
export class DesignerComponent {
  @ViewChild('drawflow') wrapper:any = null;
  editor:any = null;

  components:Array<ComponentInfo> = components;
  private dynamicContainer!: ComponentRef<DynamicContainerComponent>;

  constructor(private viewContainerRef: ViewContainerRef, private injector: Injector) {}

  ngOnInit() {
    this.dynamicContainer = this.viewContainerRef.createComponent(DynamicContainerComponent, { injector: this.injector });
  }

  ngAfterViewInit(){
    this.editor = new Drawflow(this.wrapper.nativeElement);
    this.editor.start();
  }
  onDrop(event:any){
    const id:number = event.dataTransfer.getData("id");
    this.addNodeToDrawFlow(this.components[id], event.clientX, event.clientY);
  }
  allowDrop(event:any){
    event.preventDefault();
  }
  addNodeToDrawFlow(component:ComponentInfo, posX:number, posY:number){
    var item = new StepComponent();
    item.title = component.label;
    const html = this.dynamicContainer.instance.renderComponent(component.label);
    this.editor.addNode(component.name, component.inputs, component.outputs, posX, posY, component.name, {}, html );
  }
}
