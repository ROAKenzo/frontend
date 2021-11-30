import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {UsuarioComponent} from './components/usuario/usuario.component';

const routes: Routes = [
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'usuario/:id', component:UsuarioComponent},
  {path:'**',pathMatch:'full',redirectTo:'usuarios'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
