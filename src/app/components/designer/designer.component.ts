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
import { PageSelectorComponent } from "../page-selector/page-selector.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { v4 as uuidv4} from "uuid";
import { PagesToolbarComponent } from "../pages-toolbar/pages-toolbar.component";

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [SharedModule, MatExpansionModule, StepSelectorComponent, NavComponent, PageSelectorComponent, PagesToolbarComponent],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.scss'
})
export class DesignerComponent {
  @ViewChild('drawflow') wrapper:any = null;
  editor:Drawflow|null = null;
  @Input() package: DrawFlowPackageModel|null = null;
  @Output() close: EventEmitter<any> = new EventEmitter();
   
  pages:Array<string> = ["Home"];
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
      id: uuidv4(),
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
    this.editor.addNode(
      stepEntity.name, 
      stepEntity.inputsCount, 
      stepEntity.outputsCount, 
      this.getPosX(posX), 
      this.getPosY(posY), 
      `${stepEntity.name} ${stepEntity.class??''}`.trim(), 
      stepEntity.variables, 
      this.stepRenderer.instance.renderComponent(stepEntity),
      false
    );
  }
  getPosX(posX: number): number{
    const {precanvas, zoom} = this.editor!;
    const baseCalc = precanvas.clientWidth / (precanvas.clientWidth * zoom);
    return posX * (baseCalc) - (precanvas.getBoundingClientRect().x * (baseCalc));
  }
  getPosY(posY: number): number {
    const {precanvas, zoom} = this.editor!;
    const baseCalc = precanvas.clientHeight / (precanvas.clientHeight * zoom); 
    return posY * (baseCalc) - (precanvas.getBoundingClientRect().y * (baseCalc));
  }
  onPageChange(item: any){
    this.editor?.changeModule(item);
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
      console.log(this.package)
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
      this.pages = Object.keys(value.drawflow);

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
    const packageEntity = await this.packageService.save(this.package);
    this.package = DrawFlowPackageConverter.toExtendedModel(packageEntity);
  }
  onClose(){
    sessionStorage.removeItem("packageId");
    this.close.emit("close designer");
  }
}
