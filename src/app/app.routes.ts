import { Routes } from '@angular/router';
import { DesignerPageComponent } from './pages/designer-page/designer-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PackagesPageComponent } from './pages/packages-page/packages-page.component';

export const routes: Routes = [  
    { path: 'designer', component: DesignerPageComponent },  
    { path: 'packages', component: PackagesPageComponent },  
    { path: '',  component: HomePageComponent },
    { path: '**', redirectTo: "/" }
];
