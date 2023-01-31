import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { User } from '../_types/user.types';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    user: User = { email: '', password: '', displayname: '' };
    registerForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }

    registerFormSubmit() {
        console.log('Register Form submit... ');
        if (this.registerForm.valid) {
            // ToDo Form entgegen nehmen und createUserWithEmailAndPassword aus auth.service.ts aufrufen
        }
    }
}
