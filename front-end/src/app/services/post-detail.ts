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

import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class PostDetailService {
    private baseUrl = 'http://localhost:4202/post'; // Need to change to https & ghotigames.com

    constructor (private http: Http) {}

    getPost (postNumber: number): Observable<string> {
        let body = JSON.stringify({PostNumber: postNumber});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res.json();
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
