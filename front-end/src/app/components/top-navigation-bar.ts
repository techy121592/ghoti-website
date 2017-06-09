/**
 * Copyright (C) 2017  David Welch
 *
 *
 * This program is free software; you can redistribute it and/or
 *
 * modify it under the terms of the GNU General Public License
 *
 * as published by the Free Software Foundation; either version 2
 *
 * of the License, or (at your option) any later version.
 *
 *
 *This program is distributed in the hope that it will be useful,
 *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *
 * GNU General Public License for more details.
 *
 *
 * You should have received a copy of the GNU General Public License
 *
 * along with this program; if not, write to the Free Software
 *
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 */

import {Component, OnInit} from '@angular/core';
import '../rxjs-operators';

@Component({
    selector: 'top-navigation-bar',
    styleUrls:['../styles/top-navigation-bar.css'],
    templateUrl: '../templates/top-navigation-bar.html'
})

export class TopNavigationBarComponent implements OnInit {
    logInOutUrl: string;
    logInOutText: string;

    ngOnInit() {
        this.setLogInOutVariables(); // This could be called in the constructor for now, but I am putting it here, so that when I have it do work, I won't have to move it.
    }
    // I can make the API server the client pages. Might make sense...
    setLogInOutVariables() {
        this.logInOutUrl = "/login";
        this.logInOutText = "Login";
    }
}
