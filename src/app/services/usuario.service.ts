import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { UsuarioModel } from '../model/usuario.model';
import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'https://localhost:5001/Accounts';
  

  constructor(private http: HttpClient) {
  }
  crearUsuario(usuario: UsuarioModel) {
    return this.http.post(`${this.url}/register/`, usuario)
      .pipe(map((res: any) => {
        usuario.id = res.FirstName;
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