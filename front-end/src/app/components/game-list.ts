/**
 * Created by David Welch on 6/4/17.
 *
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

import {Component, OnInit} from '@angular/core';
import {GameListService} from "../services/game-list";
import '../rxjs-operators';

@Component({
  selector: 'game-list',
  providers: [GameListService],
  styleUrls:['../styles/game-list.css'],
  templateUrl: '../templates/game-list.html'
})

export class GameListComponent implements OnInit {
  games: any;

  constructor (private gameListService: GameListService) {}

  ngOnInit() { this.getGames(); }

  getGames() {
    this.gameListService.getGames()
      .subscribe(games => this.games = games);
  }
}

