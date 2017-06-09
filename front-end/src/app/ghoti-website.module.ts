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

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GhotiWebsiteComponent }   from './components/ghoti-website';
import { HttpModule, JsonpModule } from "@angular/http";
import {FormsModule} from "@angular/forms";
import {routing, ghotiBlogRoutingProviders} from "./ghoti-website.routing";
import {TopNavigationBarComponent} from "./components/top-navigation-bar";
import {BlogListComponent} from "./components/blog-list";
import {PostDetailComponent} from "./components/post-detail";
import {GameListComponent} from "./components/game-list";
import {GamePageComponent} from "./components/game-page";
import {AboutComponent} from "./components/about";
import {PageNotFoundComponent} from "./components/page-not-found";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    routing
  ],
  declarations: [
    GhotiWebsiteComponent,
    TopNavigationBarComponent,
    BlogListComponent,
    GameListComponent,
    PostDetailComponent,
    GameListComponent,
    GamePageComponent,
    AboutComponent,
    PageNotFoundComponent
  ],
  providers: [
    ghotiBlogRoutingProviders
  ],
  bootstrap:    [ GhotiWebsiteComponent ]
})

export class GhotiWebsiteModule { }
