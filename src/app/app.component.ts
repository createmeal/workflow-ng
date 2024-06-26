import { Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import Drawflow from 'drawflow';
import { ComponentInfo } from './types/component-info';
import { components } from './data/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatSidenavModule, CollectionListComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('drawflow') wrapper:any = null;
  editor:any = null;
  html:any = "\            <div>\n              <div class=\"title-box\"><i class=\"fas fa-code\"></i>{{title}}</div>\n              <div class=\"box\">\n                </div>\n            </div>\n            ";

  components:Array<ComponentInfo> = components;

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
    const html = this.html.replaceAll("{{title}}",component.label);
    this.editor.addNode(component.name, component.inputs, component.outputs, posX, posY, component.name, {}, html );
  }
}
