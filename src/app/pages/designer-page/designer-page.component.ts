import { Component } from '@angular/core';
import { DesignerComponent } from '../../components/designer/designer.component';
import { PackageService } from '../../services/package-service';
import { DrawFlowPackageModel } from '../../models/drawflow-package-model';
import { DrawFlowPackageConverter } from '../../converters/drawflow-package-converter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designer-page',
  standalone: true,
  imports: [DesignerComponent],
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
