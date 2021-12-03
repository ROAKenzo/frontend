import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';

enum EmailStatus {
    Verifying,
    Failed
}

@Component({ templateUrl: 'email-verification.component.html' })
export class VerifyEmailComponent implements OnInit {
    EmailStatus = EmailStatus;
    emailStatus = EmailStatus.Verifying;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private registerService: RegisterService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        const token = this.route.snapshot.queryParams['token'];

        // remove token from url to prevent http referer leakage
        this.router.navigate([''], { relativeTo: this.route, replaceUrl: true });

        this.registerService.VerifyEmail(token)
            .pipe(first())
            .subscribe({
                next: () => {
                    Swal.fire({
                        text:'Verification successful,now you can login',
                        icon:'success'
                      });
                    this.router.navigate(['/login']);
                },
                error: () => {
                    this.emailStatus = EmailStatus.Failed;
                }
            });
    }
}