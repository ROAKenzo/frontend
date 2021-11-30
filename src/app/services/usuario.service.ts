import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { UsuarioModel } from '../model/usuario.model';
import { map,delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'https://localhost:5001/api';
  

  constructor(private http: HttpClient) {
  }
  crearUsuario(usuario: UsuarioModel) {
    return this.http.post(`${this.url}/Usuario`, usuario)
      .pipe(map((res: any) => {
        usuario.id = res.name;
        return usuario;
      }))
  }

  getUsuario(id:string){
     return this.http.get(`${this.url}/Usuario/${id}`)

  }

  getUsuarios(){
    return this.http.get(`${this.url}/Usuario`)
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
    return this.http.put(`${this.url}/Usuario/${usuario.id}`,UsuarioTemp)
  }

  borrarUsuario(id:string){
    return this.http.delete(`${this.url}/Usuario/${id}`)
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