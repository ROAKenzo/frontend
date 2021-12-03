import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioModel } from '../model/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'http://localhost:4000/Accounts';
  public datousuario="";
  

  constructor(private http: HttpClient,private route: ActivatedRoute,
    private router: Router) {
  }
  crearUsuario(usuario: UsuarioModel) {
    return this.http.post(`${this.url}/register/`, usuario)
      .pipe(map((res: any) => {
        usuario.id = res.firstName;
        return usuario;
      }))
  }

  getUsuario(id:string){
     return this.http.get(`${this.url}/${id}`)

  }

  getUsuarios(){
    return this.http.get(`${this.url}`)
    .pipe(
      map(this.crearArreglo),
      delay(1500)
    );
  }
  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}/authenticate`,{ email, password }).subscribe({
       next:data => {
         // get return url from query parameters or default to home page
         /* 
         this.router.navigateByUrl(returnUrl); */
         localStorage.setItem('currentUser', JSON.stringify({ token: data.jwtToken, name: data.firstName }));
         const tok=JSON.parse(localStorage.getItem('currentUser')||'{}');
         if(localStorage.getItem("token")!=""){
           const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/usuarios';
           this.router.navigateByUrl(returnUrl);
         }
         
       },
     error:error=>{
       console.error(error);
     }
     
     });
    
     //return this.http.post<any>(`${this.url}/authenticate`, { email, password }, { withCredentials: true })
     
       /* .pipe(map(account => {
             this.accountSubject.next(account);
             this.startRefreshTokenTimer();
             return account;
         })); */
   }  

  actualizarUsuario(usuario:UsuarioModel){
    const UsuarioTemp={
      ...usuario
    };
    delete UsuarioTemp.id;
    return this.http.put(`${this.url}/${usuario.id}`,UsuarioTemp)
  }

  borrarUsuario(id:string){
    return this.http.delete(`${this.url}/${id}`)
  }

  private crearArreglo(usuariosObj:Record<string, any>){
    const usuarios: UsuarioModel[]=[];
    console.log(usuariosObj);
    

    Object.keys(usuariosObj).forEach(key =>{
      const usuario:UsuarioModel=usuariosObj[key];
      /* usuario.id=key; */
      usuarios.push(usuario)
    }
    )
    if(usuariosObj===null){
      return [];
    }
    return usuarios;
  }
}