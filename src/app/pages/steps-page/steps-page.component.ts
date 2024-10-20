import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SharedModule } from '../../shared/shared.module';
import { NavComponent } from '../../components/nav/nav.component';
import { StepService } from '../../services/step-service';
import { StepEntity } from '../../entities/step.entity';

@Component({
  selector: 'app-steps-page',
  standalone: true,
  imports: [SharedModule,NavComponent],
  templateUrl: './steps-page.component.html',
  styleUrl: './steps-page.component.scss'
})
export class StepsPageComponent {
  displayedColumns: string[] = ['name','description','actions'];
  dataSource: MatTableDataSource<StepEntityDataSource>;
  actions: any = [{
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
  constructor(private readonly stepService: StepService){
    this.dataSource = new MatTableDataSource<StepEntityDataSource>([]);

    this.stepService.list(this.paginator?.pageIndex,this.paginator?.pageSize).then(steps=>{
      this.dataSource = new MatTableDataSource<StepEntityDataSource>(steps.map((item:StepEntity)=>{
        const output: StepEntityDataSource = {...item,actions:this.actions};
        return output;
      }));
    });
  }
  ngAfterViewInit() {
    if(this.paginator){
      this.dataSource.paginator = this.paginator;
    }
  }
  onEdit(event: Event){
    throw Error("Not implemented");
  }
  onDelete(event: Event){
    throw Error("Not implemented");
  }
}

export interface StepEntityDataSource extends StepEntity {
  actions: any
}

