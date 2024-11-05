import { Component } from '@angular/core';
import { DesignerComponent } from '@app/components/designer/designer.component';
import { PackageService } from '@app/services/package-service/package-service';
import { DrawFlowPackageModel } from '@app/models/drawflow-package-model';
import { DrawFlowPackageConverter } from '@app/converters/drawflow-package-converter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designer-page',
  standalone: true,
  imports: [DesignerComponent ],
  templateUrl: './designer-page.component.html',
  styleUrl: './designer-page.component.scss'
})
export class DesignerPageComponent {
  package: DrawFlowPackageModel|null = null;
  
  constructor(private readonly packageService: PackageService, private readonly router: Router){}
  async ngAfterViewInit() {
    const packageId = sessionStorage.getItem("packageId");
    if(packageId){
      const packageEntity = await this.packageService.get(packageId);
      this.package = DrawFlowPackageConverter.toExtendedModel(packageEntity);
    }
  }
  onClose(event:any){
    this.router.navigate(["packages"]);
  }
}
