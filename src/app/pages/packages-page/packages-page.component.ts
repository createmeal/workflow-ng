import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PackageEntity } from '../../entities/package.entity';
import { SharedModule } from '../../shared/shared.module';
import { NavComponent } from '../../components/nav/nav.component';
import { PackageService } from '../../services/package-service';
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [SharedModule,NavComponent],
  templateUrl: './packages-page.component.html',
  styleUrl: './packages-page.component.scss'
})
export class PackagesPageComponent {
  displayedColumns: string[] = ['name','description', 'startPageName', 'createdAt','actions'];
  dataSource: MatTableDataSource<PackageEntityDataSource>;
  actions: any = [{
    name: "Play",
    icon: "play_arrow",
    color: "",
    onClick: this.onPlay
  },{
    name: "Edit",
    icon: "edit",
    color: "accent",
    onClick: this.onEdit
  },{
    name: "Delete",
    icon: "delete",
    color: "warn",
    onClick: this.onDelete
  }]

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private readonly packageService: PackageService){
    this.dataSource = new MatTableDataSource<PackageEntityDataSource>([]);
    

    this.packageService.list(this.paginator?.pageIndex,this.paginator?.pageSize).then(packages=>{
      this.dataSource = new MatTableDataSource<PackageEntityDataSource>(packages.map((item:PackageEntity)=>{
        const output: PackageEntityDataSource = {...item,actions: this.actions};
        return output;
      }));
    });
  }
  ngAfterViewInit() {
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
  onPlay(event: Event){
    throw Error("Not implemented");
  }
  onEdit(event: Event){
    throw Error("Not implemented");
  }
  onDelete(event: Event){
    throw Error("Not implemented");
  }
}
export interface PackageEntityDataSource extends PackageEntity {
  actions: any
}