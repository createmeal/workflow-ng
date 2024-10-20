import { Component,ViewChild, ComponentRef, Injector, ViewContainerRef, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { StepRendererComponent } from '../step-renderer/step-renderer-component';
import { StepSelectorComponent } from '../step-selector/step-selector.component';
import { SharedModule } from '../../shared/shared.module';

import Drawflow from 'drawflow';
import { StepService } from '../../services/step-service';
import { PackageService } from '../../services/package-service';
import { DrawFlowPackageModel } from '../../models/drawflow-package-model';
import { DrawFlowPackageConverter } from '../../converters/drawflow-package-converter';
import { StepEntity } from '../../entities/step.entity';
import { NavComponent } from "../nav/nav.component";
@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [SharedModule, StepSelectorComponent, NavComponent],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.scss'
})
export class DesignerComponent {
  @ViewChild('drawflow') wrapper:any = null;
  editor:Drawflow|null = null;
  @Input() package: DrawFlowPackageModel|null = null;
  @Output() close: EventEmitter<any> = new EventEmitter();

  components:Array<StepEntity> = [];
  private stepRenderer!: ComponentRef<StepRendererComponent>;
  constructor(private viewContainerRef: ViewContainerRef, 
    private injector: Injector, 
    private readonly packageService: PackageService,
    private readonly stepService: StepService) {
    }

  ngOnInit() {
    this.stepRenderer = this.viewContainerRef.createComponent(StepRendererComponent, { injector: this.injector });
    this.stepService.list().then(components=> this.components = components);
  }

  ngAfterViewInit(){
    this.startEditor();
  }
  ngOnChanges(changes: SimpleChanges) {
    const value = changes['package'].currentValue;
    if(value && !changes['package'].previousValue){
      this.setEditorData();
    }
  }

  startEditor(){
    this.editor = new Drawflow(this.wrapper.nativeElement);
    this.editor.start();
    this.package = {
      id: "",
      name: "",
      description: "",
      drawflow: {},
      startPageName: "",
      variables: {}
    };
  }
  onDrop(event:any){
    this.addNodeToDrawFlow(event.dataTransfer.getData("id"), event.clientX, event.clientY);
  }
  allowDrop(event:any){
    event.preventDefault();
  }
  addNodeToDrawFlow(componentId:string, posX:number, posY:number){    
    const stepEntity = this.components.find((item: StepEntity)=> item.id === componentId);
    if(!stepEntity){
      throw Error("Step component not found");
    }
    if(!this.editor){
      throw Error("The Editor is null");
    }
    
    const html = this.stepRenderer.instance.renderComponent(stepEntity);
    this.editor.addNode(stepEntity.name, stepEntity.inputsCount, stepEntity.outputsCount, posX, posY, `${stepEntity.name} ${stepEntity.class}`, stepEntity.variables, html,false );
  }
  async onImport(event: Event){
    if(!this.editor){
      throw Error("The Editor is null");
    }

    this.package = await this.packageService.import(event);
    this.setEditorData();
  }
  setEditorData(){
    if(this.package && this.editor){
      const pages = this.package.drawflow;
      Object.keys(this.package.drawflow).forEach(pageKey=>{
        const page =pages[pageKey]; 
        if(page.data){
          Object.keys(page.data).forEach(key=>{
            const step = page.data[key];
            const html = page.data[key].html;
            page.data[key].html = html ? html : this.stepRenderer.instance.renderComponent(step);
          })
        }
      })

      const value = DrawFlowPackageConverter.toNativeModel(this.package);
      
      this.editor.import(value);
    }
  }
  onExport(){
    if(!this.editor){
      throw Error("The Editor is null");
    }
    this.package = DrawFlowPackageConverter.toExtendedModel(this.editor.export(),this.package);
    this.packageService.export(this.package);
  }
  async onSave(){
    if(!this.editor){
      throw Error("The Editor is null");
    }
    this.package = DrawFlowPackageConverter.toExtendedModel(this.editor.export(),this.package);
    const result = await this.packageService.save(this.package);
    if(result["_id"]){
      console.log(result["_id"]);
    }
  }
  onClose(){
    sessionStorage.removeItem("packageId");
    this.close.emit("close designer");
  }
}
