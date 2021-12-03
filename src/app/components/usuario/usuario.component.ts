import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UsuarioModel } from 'src/app/model/usuario.model';
import {UsuarioService} from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario=new UsuarioModel();
  constructor(private usuarioService:UsuarioService,
              private route:ActivatedRoute
    ) { }

  ngOnInit() {
    const id=this.route.snapshot.paramMap.get('id')!;

    if(id!== 'nuevo'){
      this.usuarioService.getUsuario(id)
        .subscribe((res:UsuarioModel)=>{
          this.usuario=res;
          this.usuario.id=id;
        })
    }
}
guardar(form: NgForm) {
  if(form.invalid){
    console.log('Formulario no valido')
  }
  Swal.fire(
    {
      title:'Espere',
      text:'Guardando Información',
      allowOutsideClick:false,
      icon:'info'
      
    }
  )

  Swal.showLoading();
  let peticion: Observable<any>;
  if(this.usuario.id){
    peticion=this.usuarioService.actualizarUsuario(this.usuario);
      
  }else{

    peticion=this.usuarioService.crearUsuario(this.usuario);
      
  }
  peticion.subscribe(res =>{
    Swal.fire({
      title:this.usuario.FirstName,
      text:'Se actualizó correctamente',
      icon:'success'
    })
  })
 
}

}
