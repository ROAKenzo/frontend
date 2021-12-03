import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { VerifyEmailComponent } from './components/email-verification/email-verification.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'accounts/register', component: RegisterComponent },
  { path: 'accounts/verify-email', component: VerifyEmailComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }