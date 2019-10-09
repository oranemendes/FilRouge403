import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    { path: 'association', loadChildren: './pages/association/association.module#AssociationPageModule' },
    { path: 'application', loadChildren: './pages/application/application.module#ApplicationPageModule' },
    { path: 'map/:lat/:lng', loadChildren: './pages/map/map.module#MapPageModule'},
    { path: 'map', loadChildren: './pages/map/map.module#MapPageModule'},
    { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule'},
    { path: 'house-card/:ref', loadChildren: './pages/house-card/house-card.module#HouseCardPageModule'},
    { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule'},
    { path: 'new-house', loadChildren: './pages/new-house/new-house.module#NewHousePageModule'},
    { path: 'upload/:ref/:nbPic', loadChildren: './pages/upload/upload.module#UploadPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
