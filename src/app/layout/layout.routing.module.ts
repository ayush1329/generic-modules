import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "./layout.component";

const routes: Routes = [ 
    {
    path: '', 
    component: LayoutComponent,
    children:
        [
            {
                path: '', loadChildren: () => import('../shared/shared.module').then(m => m.SharedModule)
            },
            {
                path: 'list', loadChildren: () => import('../modules/list.module').then(m => m.ListModule)
            },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }