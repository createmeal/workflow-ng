import { Routes } from '@angular/router';
import { DesignerComponent } from './components/designer/designer.component';

export const routes: Routes = [  
    { path: 'designer', component: DesignerComponent },  
    { path: '',   redirectTo: '/designer', pathMatch: 'full' }
];
