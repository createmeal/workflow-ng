import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";

const modules = [
  CommonModule,
  MatSidenavModule
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class SharedModule { }
