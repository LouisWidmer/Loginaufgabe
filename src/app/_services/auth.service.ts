import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../_types/user.types';
import { NavController, ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private toast: ToastController,
        private menuCtrl: MenuController
    ) {}

    async loginWithEmailAndPassword(user: User, redirectToURL?: string) {
        try {
            const result = await //signInWithEmailAndPassword hier aufrufen
            
            if (result) {
                this.menuCtrl.enable(true);
                // Logged in
                if (redirectToURL) {
                    this.router.navigateByUrl(redirectToURL);
                }
            }
        } catch (e) {
            this.toast
                .create({
                    message: `Fehler beim Login!`,
                    duration: 3000,
                })
                .then((toast) => toast.present());
            this.router.navigateByUrl('/login');
        }
    }

    async createUserWithEmailAndPassword(user: User, redirectToURL?: string) {
        try {
            const result = //createUserWithEmailAndPassword funktion hier aufrufen

            if (result) {
                await (
                    await this.afAuth.currentUser
                ).updateProfile({
                    displayName: user.displayname,
                    photoURL: '',
                });

                this.toast
                    .create({
                        message: `Benutzer ${result.user.email} erfolgreich registriert!`,
                        duration: 3000,
                    })
                    .then((toast) => toast.present());
            }
            if (redirectToURL) {
                this.router.navigateByUrl(redirectToURL);
            }
        } catch (e) {
            console.log(e);
            this.toast
                .create({
                    message: `Registrierung fehlgeschlagen!`,
                    duration: 3000,
                })
                .then((toast) => toast.present());
        }
    }
    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.afAuth.currentUser !== null;
    }

    logout() {
        this.afAuth.signOut().then(() => {
            console.log('User succesfully logged out!');
            this.menuCtrl.enable(false);
            this.router.navigateByUrl('/login');
        });
    }
}
