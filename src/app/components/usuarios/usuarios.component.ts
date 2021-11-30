import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios:UsuarioModel []=[];
  cargando=false;
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.cargando=true;
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.usuarios=res;
        this.cargando=false;
      })
  }
  borrarUsuario(usuario: Record<string, any>,i:number){
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro?',
      showCancelButton:true,
      showConfirmButton:true
    }).then(
      res => {
        if(res.value){
          this.usuarios.splice(i,1);
          this.usuarioService.borrarUsuario(usuario['id']).subscribe();
          
        }
      }
    );
  }

}
