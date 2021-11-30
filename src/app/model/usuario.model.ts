
import { UsuarioComponent } from "../components/usuario/usuario.component";

export class UsuarioModel{
    id?: string;
    nombre?: string;
    apellidos?: string;
    activo?: boolean;

    constructor(){
        this.activo=true;
    }
}
