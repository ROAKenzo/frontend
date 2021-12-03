import { NgModule, Component } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'usuario/:id', component:UsuarioComponent},
  //{path:'**',pathMatch:'full',redirectTo:'usuarios'},
  {path: 'login',pathMatch:'full', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }