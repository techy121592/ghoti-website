/**
 * Copyright (C) 2017  David Welch
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 **/

import {Component, HostListener, OnInit} from '@angular/core';
import '../rxjs-operators';

@Component({
  selector: 'top-navigation-bar',
  styleUrls:['../styles/top-navigation-bar.css'],
  templateUrl: '../templates/top-navigation-bar.html'
})

export class TopNavigationBarComponent implements OnInit {
  windowWidth: number;
  sideMenuShowing: boolean;

  ngOnInit() {
    this.setWindowWidth();
    this.sideMenuShowing = false;
  }

  @HostListener('window:resize') onResize() {
    this.setWindowWidth();
  }

  setWindowWidth() {
    this.windowWidth = window.innerWidth;
  }

  toggleMenu() {
    this.sideMenuShowing = !this.sideMenuShowing;
  }
}
