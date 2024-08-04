import { Routes } from '@angular/router';
import { DesignerPageComponent } from './pages/designer-page/designer-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [  
    { path: 'designer', component: DesignerPageComponent },  
    { path: '',  component: HomePageComponent },
    { path: '**', redirectTo: "/" }
];
