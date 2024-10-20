import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PackageEntity } from '../../entities/package.entity';
import { SharedModule } from '../../shared/shared.module';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [SharedModule,NavComponent],
  templateUrl: './packages-page.component.html',
  styleUrl: './packages-page.component.scss'
})
export class PackagesPageComponent {
  displayedColumns: string[] = ['name','description', 'startPageName', 'createdAt','actions'];
  dataSource = new MatTableDataSource<PackageEntityTable>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
}
interface PackageEntityTable extends PackageEntity {
  actions: any
}
const ELEMENT_DATA: PackageEntityTable[] = [
  {
    name: "package name",
    description: "package description",
    pages: [],
    startPageName: "start-page",
    createdAt: new Date(),
    updatedAt: new Date(),
    actions: [{
      name: "Play",
      icon: "play_arrow",
      color: ""
    },{
      name: "Edit",
      icon: "edit",
      color: "accent"
    },{
      name: "Delete",
      icon: "delete",
      color: "warn"
    }]
  }
];