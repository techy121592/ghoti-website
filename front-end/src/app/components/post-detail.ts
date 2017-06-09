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
import {PostDetailService} from "../services/post-detail";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'post-detail',
    providers: [PostDetailService],
    styleUrls:['../styles/post-detail.css'],
    templateUrl: '../templates/post-detail.html'
})

export class PostDetailComponent implements OnInit {
    post: any;

    constructor (
        private postListService: PostDetailService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        let postNumber = +this.route.snapshot.params['postNumber'];
        this.getPost(postNumber);
    }

    getPost(postNumber: number) {
        this.postListService.getPost(postNumber)
            .subscribe(post => this.post = post);
    }
}
