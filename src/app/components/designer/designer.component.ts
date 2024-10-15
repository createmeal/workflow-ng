import { Component,ViewChild, ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { StepRendererComponent } from '../step-renderer/step-renderer-component';
import { StepSelectorComponent } from '../step-selector/step-selector.component';
import { SharedModule } from '../../shared/shared.module';

import Drawflow from 'drawflow';
import { ComponentInfo } from '../../types/component-info';
import { StepService } from '../../services/step-service';
import { PackageService } from '../../services/package-service';
import { PackageEntity } from '../../entities/package.entity';
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

  components:Array<ComponentInfo> = [];
  private stepRenderer!: ComponentRef<StepRendererComponent>;
  constructor(private viewContainerRef: ViewContainerRef, 
    private injector: Injector, 
    private readonly packageService: PackageService,
    private readonly stepService: StepService) {}

  ngOnInit() {
    this.stepRenderer = this.viewContainerRef.createComponent(StepRendererComponent, { injector: this.injector });
    this.stepService.list().then(components=> this.components = components);
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
    const component = this.components.find((item: ComponentInfo)=> item.id === componentId);
    if(!component){
      throw Error("Step component not found");
    }

    const html = this.stepRenderer.instance.renderComponent(component);
    this.editor.addNode(component.name, component.inputsCount, component.outputsCount, posX, posY, component.name, {}, html );
  }
  async onImport(event: any){
    this.editor.import(await this.packageService.import(event));
  }
  onExport(){
    this.packageService.export(this.editor.export());
  }
  async onSave(){
    const result = await this.packageService.save(this.editor.export());
    if(result["_id"]){
      console.log(result["_id"]);
    }
  }
}
