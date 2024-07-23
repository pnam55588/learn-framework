import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {DetailsComponent} from './details/details.component'
import { AdminComponent } from './admin/admin.component';

const routeConfig : Routes = [
    {
        path: '',
        component: HomeComponent,
        data:{
            title: 'Home'
        }
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        data:{
            title: 'Details'
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        data:{
            title: 'Admin'
        }
    }
]


@NgModule({
  imports: [RouterModule.forRoot(routeConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
