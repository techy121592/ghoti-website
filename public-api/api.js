/**
 * Created by David Welch on 8/14/2016.
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
 */

const assert = require('assert');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('express')();
const mongoClient = require('mongodb').MongoClient;

const chunkSize = 10;
const url = 'mongodb://192.168.1.16:27017/ghoti-website';

const originsWhiteList = [
    'https://ghotigames.com',
    'http://localhost:4200'
];

const corsOptions = {
    origin: function(origin, callback) {
        let isWhitelisted = originsWhiteList.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

let dbConn, maxPostNumber, maxGameNumber;

setupWebsiteAPI();

/*
 * FUNCTIONS
 */
function setupWebsiteAPI() {
    app.use(bodyParser.json());
    app.use(cors(corsOptions));

    app.post('/post', getPost);
    app.post('/posts', getListOfPosts);
    app.post('/game', getGame);
    app.post('/games', getListOfGames);

    console.log("Starting Ghoti Games Public Website API");
    app.listen(4202, connectToMongoDB);
}

function connectToMongoDB() {
    mongoClient.connect(url, (err, db) => {
        assert.equal(null, err);

        console.log("Connected successfully to mongo server");
        console.log('Ghoti Games Public Website API listening to 4202!');
        dbConn = db;
        getMaxPostNumber();
        getMaxGameNumber();
    });
}

function getMaxPostNumber() {
    let posts = dbConn.collection('posts');
    posts.count(setMaxPostNumber);
}

function getMaxGameNumber() {
    let games = dbConn.collection('games');
    games.count(setMaxGameNumber);
}

function setMaxPostNumber(err, count) {
    assert.equal(null, err);
    console.log('Current post number ' + count);
    maxPostNumber = count;
}

function setMaxGameNumber(err, count) {
    assert.equal(null, err);
    console.log('Current game number ' + count);
    maxGameNumber = count;
}


function cleanPostFilter(uncleanFilter) {
    return {
        PostNumber: uncleanFilter.PostNumber
    };
}

function cleanGameFilter(uncleanFilter) {
    return {
        GameNumber: uncleanFilter.GameNumber
    };
}

function cleanPostListFilter(uncleanFilter) {
    return {
        PostNumber: {
            $gt: maxPostNumber - chunkSize * uncleanFilter.Chunk,
            $lt: maxPostNumber - chunkSize * (uncleanFilter.Chunk - 1) + 1
        }
    };
}

function cleanGameListFilter(uncleanFilter) {
    return {
        GameNumber: {
            $gt: maxGameNumber - chunkSize * uncleanFilter.Chunk,
            $lt: maxGameNumber - chunkSize * (uncleanFilter.Chunk - 1) + 1
        }
    };
}


function getPost(req, res) {
    res.header("Content-Type", "application/json");

    let posts = dbConn.collection('posts');
    posts.find(cleanPostFilter(req.body))
        .toArray((err, postArray) => {
            assert.equal(err, null);
            res.send(JSON.stringify(postArray[0]));
        });
}

function getGame(req, res) {
    res.header("Content-Type", "application/json");

    let games = dbConn.collection('games');
    games.find(cleanGameFilter(req.body))
        .toArray((err, gameArray) => {
            assert.equal(err, null);
            res.send(JSON.stringify(gameArray[0]));
        });
}

function getListOfPosts(req, res) {
    res.header("Content-Type", "application/json");

    let posts = dbConn.collection('posts');
    posts.find(cleanPostListFilter(req.body),
        {"sort": [['PostNumber', 'desc']]})
        .toArray(
            function (err, postArray) {
                assert.equal(err, null);
                res.send(JSON.stringify({Posts: postArray}));
            });
    getMaxPostNumber(); // I know it is a bit late here, but at least this will update the count for the next time
}

function getListOfGames(req, res) {
    res.header("Content-Type", "application/json");

    let games = dbConn.collection('games');
    games.find(cleanGameListFilter(req.body),
        {"sort": [['GameNumber', 'desc']]})
        .toArray((err, gameArray) => {
            assert.equal(err, null);
            res.send(JSON.stringify({Games: gameArray}));
        });
    getMaxGameNumber(); // I know it is a bit late here, but at least this will update the count for the next time
}
