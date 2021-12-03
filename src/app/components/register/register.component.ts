import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountModel } from 'src/app/model/account.model';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: FormGroup;
  action =  'Register';
  id ='';
  account: AccountModel | undefined;

  constructor(private fb: FormBuilder,
              private registerService: RegisterService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService){
    this.registerUser = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', Validators.required], 
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')!;            

  }

  ngOnInit(): void {
    //this.Register();
  }

  Register(){
    //add a new account
    const account: AccountModel ={
      firstName: this.registerUser.get('FirstName')?.value,
      lastName: this.registerUser.get('LastName')?.value,
      email: this.registerUser.get('Email')?.value,
      password: this.registerUser.get('Password')?.value,
      confirmPassword: this.registerUser.get('ConfirmPassword')?.value
    }
    this.registerService.Register(account).subscribe(data =>{
      Swal.fire({
        text:'Account registered, please check your email to verify your account',
        icon:'success'
      });
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    })
  }

}
