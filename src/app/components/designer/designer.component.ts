import { Component,ViewChild, ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { StepRendererComponent } from '../step-renderer/step-renderer-component';
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
  private stepRenderer!: ComponentRef<StepRendererComponent>;

  constructor(private viewContainerRef: ViewContainerRef, private injector: Injector) {}

  ngOnInit() {
    this.stepRenderer = this.viewContainerRef.createComponent(StepRendererComponent, { injector: this.injector });
  }

  ngAfterViewInit(){
    this.editor = new Drawflow(this.wrapper.nativeElement);
    this.editor.start();
  }
  onDrop(event:any){
    this.addNodeToDrawFlow(event.dataTransfer.getData("id"), event.clientX, event.clientY);
  }
  allowDrop(event:any){
    event.preventDefault();
  }
  addNodeToDrawFlow(componentId:number, posX:number, posY:number){
    const component = this.components[componentId];
    const html = this.stepRenderer.instance.renderComponent(component);
    this.editor.addNode(component.name, component.inputs, component.outputs, posX, posY, component.name, {}, html );
  }
}
