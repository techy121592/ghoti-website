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

import {Component, OnInit} from '@angular/core';
import '../rxjs-operators';
import {GamePageService} from "../services/game-page";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'game-page',
  providers: [GamePageService],
  styleUrls:['../styles/game-page.css'],
  templateUrl: '../templates/game-page.html'
})

export class GamePageComponent implements OnInit {
  game: any;
  runDelay: any;

  constructor (
    private gamePageService: GamePageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let gameNumber = +this.route.snapshot.params['gameNumber'];
    this.getGame(gameNumber);
  }

  static runGame(game: any, intervalReference: any) {
    clearInterval(intervalReference);
    eval(game.Body);
  }

  getGame(gameNumber: number) {
    this.gamePageService.getGame(gameNumber)
      .subscribe(game => {
        this.game = game;
        this.runDelay = setInterval(() => GamePageComponent.runGame(this.game, this.runDelay), 1);
      });
  }
}
