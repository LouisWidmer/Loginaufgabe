import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list',
        },
    ];

    constructor(
        private platform: Platform,
        private router: Router,
        private menuCtrl: MenuController
    ) {
        this.initializeApp();
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (
                event instanceof NavigationEnd &&
                event.url != '/login' &&
                event.url != '/register' &&
                event.url != '/welcome'
            ) {
                this.menuCtrl.enable(true);
            }
        });
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.menuCtrl.enable(false);
        });
    }
}
