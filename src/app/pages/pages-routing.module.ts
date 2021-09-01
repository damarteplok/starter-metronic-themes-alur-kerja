import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { EditorModule } from '@tinymce/tinymce-angular';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'category',
        loadChildren: () =>
            import('./category2/category2.module').then((m) => m.Category2Module),
      },
      {
        path: 'articles',
        loadChildren: () =>
            import('./articles3/articles3.module').then((m) => m.Articles3Module),
      },
      {
        path: 'jatahcuti',
        loadChildren: () =>
            import('./jatahcuti2/jatahcuti2.module').then((m) => m.Jatahcuti2Module),
      },
      {
        path: 'leave',
        loadChildren: () =>
            import('./leave/leave.module').then((m) => m.LeaveModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
      {
        path: '',
        redirectTo: '/category',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), EditorModule],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
