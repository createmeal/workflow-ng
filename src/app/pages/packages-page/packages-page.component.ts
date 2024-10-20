import { Component, inject, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { PackageEntity } from '../../entities/package.entity';
import { SharedModule } from '../../shared/shared.module';
import { NavComponent } from '../../components/nav/nav.component';
import { PackageService } from '../../services/package-service';
import { EntityColumn, ActionColumn } from '../../models/entity-table';
import { PlayPackageDialogComponent } from "../../components/play-package-dialog/play-package-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ExecutionService } from '../../services/execution-service';
import { Router, RouterOutlet,RouterLink } from '@angular/router';
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [SharedModule, NavComponent, PlayPackageDialogComponent, RouterOutlet,RouterLink],
  templateUrl: './packages-page.component.html',
  styleUrl: './packages-page.component.scss'
})
export class PackagesPageComponent {
  columns: EntityColumn[] = [
    {name: 'id', label: "Id", visible: true},
    {name: 'name', label: "Name", visible: true},
    {name: 'description', label: "Description", visible: true},
    {name: 'startPageName', label: "Start Page", visible: true},
    {name: 'createdAt', label: "Created At", visible: true},
    {name: 'actions', label: "Actions", visible: true}
  ]
  displayedColumns: string[] = this.columns.filter(item=>item.visible).map(item=>item.name);
  dataSource: MatTableDataSource<PackageEntityDataSource>;
  actions: ActionColumn[] = [{
    name: "Play",
    icon: "play_arrow",
    color: "",
    onClick: (event: Event,id: string)=>this.onPlay(event,id)
  },{
    name: "Edit",
    icon: "edit",
    color: "accent",
    onClick: (event: Event,id:string)=>this.onEdit(event,id)
  },{
    name: "Delete",
    icon: "delete",
    color: "warn",
    onClick: (event: Event,id:string)=>this.onDelete(event,id)
  }]
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private readonly packageService: PackageService, 
    private readonly executionService: ExecutionService,
    private readonly router: Router){

    this.dataSource = new MatTableDataSource<PackageEntityDataSource>([]);
    this.loadPackages();
  }
  loadPackages() {
    this.packageService.list(this.paginator?.pageIndex, this.paginator?.pageSize).then(packages => {
      this.dataSource = new MatTableDataSource<PackageEntityDataSource>(packages.map((item: PackageEntity) => {
        const output: PackageEntityDataSource = { ...item, actions: this.actions };
        return output;
      }));
    });
  }

  ngAfterViewInit() {
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
  openDialog(id:string,dialogType: any, enterAnimationDuration: string, exitAnimationDuration: string, next: any): void {
    const dialog = this.dialog.open(dialogType, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id
      }
    });
    dialog.afterClosed().subscribe(next);
  }
  onPlay(event: Event,id:string){
    this.openDialog(id,PlayPackageDialogComponent,"0ms","0ms",async (result:DialogResult)=>{
      if(result.answer){
        await this.executionService.start({packageId: id});
      }
    });
  }
  onEdit(event: Event,id:string){
    sessionStorage.setItem("packageId",id);
    this.router.navigate(["designer"]);
  }
  async onDelete(event: Event,id:string){
    const response = await this.packageService.delete(id);
    this.loadPackages();
  }
}
export interface PackageEntityDataSource extends PackageEntity {
  actions: any
}
export interface DialogResult {
  answer: boolean
}