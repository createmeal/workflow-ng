import { Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import Drawflow from 'drawflow';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatSidenavModule,MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('drawflow') wrapper:any = null;
  editor:any = null;
  components:any = [{
    id:0,
    name: "http-get",
    label: "HTTP Get",
    "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-code\"></i>{{title}}</div>\n              <div class=\"box\">\n                </div>\n            </div>\n            ",

  },{
    id:1,
    name: "console",
    label: "Console",
    "html": "\n            <div>\n              <div class=\"title-box\"><i class=\"fas fa-code\"></i>{{title}}</div>\n              <div class=\"box\">\n                </div>\n            </div>\n            ",
  }];

  ngAfterViewInit(){
    this.editor = new Drawflow(this.wrapper.nativeElement);
    this.editor.start();
  }
  onDrag(event:any,id:any){
    event.dataTransfer.setData("id", id);
  }
  onDrop(event:any){
    const id:number = event.dataTransfer.getData("id");
    this.addNodeToDrawFlow(id, event.clientX, event.clientY);
  }
  allowDrop(event:any){
    event.preventDefault();
  }
  addNodeToDrawFlow(id:any, posX:number, posY:number){
    const component:any = this.components[id];
    console.log(component);
    component.html = component.html.replaceAll("{{title}}",component.label);
    this.editor.addNode(component.name, 1,  1, posX, posY, component.name, {}, component.html );
  }
}
