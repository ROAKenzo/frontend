
import { UsuarioComponent } from "../components/usuario/usuario.component";

export class UsuarioModel{
    id?: string;
    firstName?: string;
    lastName?: string;
    IsVerified?: boolean;

    constructor(){
        this.IsVerified=true;
    }
}
