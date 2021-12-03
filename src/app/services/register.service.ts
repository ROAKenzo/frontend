import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AccountModel} from '../model/account.model';

// base Url
const baseUrl = 'http://localhost:4000/accounts';

@Injectable({providedIn: 'root'})
export class RegisterService {

    constructor(private http : HttpClient) {}

    Register(account : AccountModel) {
        return this.http.post(`${baseUrl}/register`, account);
    }

    VerifyEmail(token : string) {
        return this.http.post(`${baseUrl}/verify-email`, {token});
    }
}
