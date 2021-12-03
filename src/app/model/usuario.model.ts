
import { UsuarioComponent } from "../components/usuario/usuario.component";

export class UsuarioModel{
    id?: string;
    FirstName?: string;
    LastName?: string;
    IsVerified?: boolean;

    constructor(){
        this.IsVerified=true;
    }
}
