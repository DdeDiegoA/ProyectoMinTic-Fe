import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublicComponent } from './components/public/public.component';
import { SignUpComponent} from './components/sign-up/sign-up.component'
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PrivateComponent } from './components/private/private.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// cuando la ruta está vacia ese es el componente que se va lanzar 
const routes: Routes = [
  
  {
    path:'',  // cuando la ruta está vacia puede responder a dos rutas
    component: PublicComponent, // una ruta a su vez puede tener hijos
    children:[
      {
        path:'',  //si esta vacia responde el login
        component: AboutUsComponent
      },
      {
        path:'login',
        canActivate:[NoAuthGuard],
        component: LoginComponent
      },
      {
        path:'singup',
        canActivate:[NoAuthGuard],
        component: SignUpComponent
      },
      // sino para poner el componente de not-found
      {
        path: 'not-found',
        component: NotFoundComponent
      },
    ]
  },
  {
    path:'dashboard',
    canActivate:[AuthGuard],
    component: PrivateComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent,
      }

    ]

  },
  // cualquier path que no tenga correspondencia lo redireccione a not-found 
  {
    path:'**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
