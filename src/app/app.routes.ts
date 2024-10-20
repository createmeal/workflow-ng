import { Routes } from '@angular/router';
import { DesignerPageComponent } from './pages/designer-page/designer-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PackagesPageComponent } from './pages/packages-page/packages-page.component';
import { StepsPageComponent } from './pages/steps-page/steps-page.component';

export const routes: Routes = [  
    { path: '',  component: HomePageComponent },
    { path: 'designer', component: DesignerPageComponent },  
    { path: 'packages', component: PackagesPageComponent },  
    { path: 'steps', component: StepsPageComponent },  
    { path: '**', redirectTo: "/" }
];
