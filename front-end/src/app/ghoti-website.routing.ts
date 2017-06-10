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
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostDetailComponent} from "./components/post-detail";
import {PageNotFoundComponent} from "./components/page-not-found";
import {BlogListComponent} from "./components/blog-list";
import {GameListComponent} from "./components/game-list";
import {GamePageComponent} from "./components/game-page";
import {AboutComponent} from "./components/about";

const ghotiBlogRoutes: Routes = [
  { path: 'news/:postNumber', component: PostDetailComponent },
  { path: 'news', component: BlogListComponent },
  { path: 'games/:gameNumber', component: GamePageComponent },
  { path: 'games', component: GameListComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const ghotiBlogRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(ghotiBlogRoutes);
