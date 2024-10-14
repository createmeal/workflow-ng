import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button'; 

const modules = [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class SharedModule { }
