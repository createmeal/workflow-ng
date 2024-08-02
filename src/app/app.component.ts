import { Component, ViewChild, ComponentRef, Injector, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import Drawflow from 'drawflow';
import { ComponentInfo } from './types/component-info';
import { components } from './data/components';
import { CollectionItemComponent } from './components/collection-item/collection-item.component';
import { DynamicContainerComponent } from './components/dynamic-container/dynamic-container-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatSidenavModule, CollectionListComponent, DynamicContainerComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('drawflow') wrapper:any = null;
  editor:any = null;

  components:Array<ComponentInfo> = components;
  private dynamicContainer!: ComponentRef<DynamicContainerComponent>;

  constructor(private viewContainerRef: ViewContainerRef, private injector: Injector) {}

  ngOnInit() {
    // Cria uma instância do DynamicContainerComponent programaticamente
    const componentFactory = this.viewContainerRef.createComponent(DynamicContainerComponent, { injector: this.injector });
    this.dynamicContainer = componentFactory;
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
    var item = new CollectionItemComponent();
    item.title = component.label;
    const html = this.dynamicContainer.instance.renderComponent(component.label);
    this.editor.addNode(component.name, component.inputs, component.outputs, posX, posY, component.name, {}, html );
  }
}
