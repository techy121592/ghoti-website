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

var assert = require('assert');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = require('express')();
var mongoClient = require('mongodb').MongoClient;

var posts, maxPostNumber, games, maxGameNumber;
var chunkSize = 10;
var url = 'mongodb://192.168.1.16:27017/ghoti-website';

var originsWhiteList = [
    'http://localhost:4200'
];

var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhiteList.indexOf(origin) !== -1;
        callback(null, true);
    },
    credentials: true
};

setupWebsiteAPI();

/*
 * FUNCTIONS
 */
function setupWebsiteAPI() {
    app.use(bodyParser.json());
    app.use(cors(corsOptions));

    app.post('/post', addPost);
    app.post('/game', addGame);

    console.log("Starting Ghoti Games Private Website API");
    app.listen(4203, connectToMongoDB);
}

function connectToMongoDB() {
    mongoClient.connect(url, getCollections);
}

function getCollections(err, db) {
    assert.equal(null, err);

    console.log("Connected successfully to mongo server");
    console.log('Ghoti Games Private Website API listening to 4203!');

    posts = db.collection('posts');
    games = db.collection('games');

    getMaxPostNumber();
    getMaxGameNumber();
    //games.update({GameNumber: 1}, {GameNumber: 1, Title: "Nom!", Body: "let canvas = document.getElementById(\"game-canvas\"); canvas.width = 400; canvas.height = 400;         let gridSize = 20;         let game = {             canvas: canvas,             context: canvas.getContext(\"2d\"),             playerX: 10,             playerY: 10,             gridSize: gridSize,             tileSize: canvas.width / gridSize,             foodX: 15,             foodY: 15,             xVelocity: 0,             yVelocity: 0,             tail: [],             tailLength: 5,             update: function () {                 this.playerX += this.xVelocity;                 this.playerY += this.yVelocity;                    if(this.playerX < 0) {                     this.playerX = this.gridSize - 1;                 } else if(this.playerX >= this.gridSize) {                     this.playerX = 0;                 }                    if(this.playerY < 0) {                     this.playerY = this.gridSize - 1;                 } else if(this.playerY >= this.gridSize) {                     this.playerY = 0;                 }                    this.context.fillStyle=\"black\";                 this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);                    this.context.fillStyle=\"lime\";                 for(let i = 0; i < this.tail.length; i++) {                     this.context.fillRect(this.tail[i].x * this.tileSize + 1, this.tail[i].y * this.tileSize + 1,                         this.tileSize - 2, this.tileSize - 2);                     if(this.tail[i].x === this.playerX &&                         this.tail[i].y === this.playerY) {                         this.tailLength = 5;                     }                 }                    this.tail.push({x:this.playerX, y:this.playerY});                 while(this.tail.length > this.tailLength) {                     this.tail.shift();                 }                    if(this.foodX === this.playerX &&                     this.foodY === this.playerY) {                     this.tailLength++;                     this.foodX = Math.floor(Math.random()*this.tileSize);                     this.foodY = Math.floor(Math.random()*this.tileSize);                 }                    this.context.fillStyle=\"red\";                 this.context.fillRect(this.foodX * this.tileSize + 1, this.foodY * this.tileSize + 1,                     this.tileSize - 2, this.tileSize - 2);             },             keypressed: function(event) {                 clearInterval(game.gameLoop);                 switch(event.keyCode) {                     case 37:                         if(this.xVelocity !== 1) {                             this.xVelocity=-1;                             this.yVelocity=0;                         }                         break;                     case 38:                         if(this.yVelocity !== 1) {                             this.xVelocity = 0;                             this.yVelocity = -1;                         }                         break;                     case 39:                         if(this.xVelocity !== -1) {                             this.xVelocity = 1;                             this.yVelocity = 0;                         }                         break;                     case 40:                         if(this.yVelocity !== -1) {                             this.xVelocity = 0;                             this.yVelocity = 1;                         }                         break;                 }                 this.update();                 this.setupGameLoop();             },             gameLoop: undefined,             setupGameLoop: function() { document.getElementById(\"scoreDiv\").setAttribute(\"hidden\", true); document.getElementById(\"preview-canvas\").setAttribute(\"hidden\", true); game.gameLoop = setInterval(() => {game.update();}, 1000/15);             }         };         document.addEventListener(\"keydown\", (event) => {game.keypressed(event);});         game.setupGameLoop();"});
    //games.update({GameNumber: 2}, {GameNumber: 2, Title: "Falling Blocks", Body: "let game = createGame();  document.addEventListener(\"keydown\", (event) => { document.getElementById(\"scoreDiv\").removeAttribute(\"hidden\");  document.getElementById(\"preview-canvas\").removeAttribute(\"hidden\"); 	switch(event.keyCode) { 		case 37: 			game.currentShape.moveLeft(); 			game.draw(); 			break; 		case 38: 			game.currentShape.rotate(); 			game.draw(); 			break; 		case 39: 			game.currentShape.moveRight(); 			game.draw(); 			break; 		case 40: 			game.currentShape.moveDown(); 			game.draw(); 			break; 	} });  setInterval(function() { 	game.update(); 	game.draw(); }, 1000/5);  function createGame() { 	let canvas = document.getElementById(\"game-canvas\"); canvas.width = 200; canvas.height = 400; let previewCanvas = document.getElementById(\"preview-canvas\"); previewCanvas.width = 80; previewCanvas.height = 40; let game = { 		canvas: canvas, 		context: canvas.getContext(\"2d\"), 		previewCanvas: previewCanvas, 		previewContext: previewCanvas.getContext(\"2d\"), 		scoreDiv: document.getElementById(\"score\"), 		blockSize: canvas.width / 10, 		bagOfShapes: { 			colors: [\"#000000\", \"#F92338\", \"#C973FF\", \"#1C76BC\", \"#FEE356\", \"#53D504\", \"#36E0FF\", \"#F8931D\"], 			shapes: [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], 				[[0, 2, 0], [2, 2, 2], [0, 0, 0]], 				[[3, 0, 0], [3, 3, 3], [0, 0, 0]], 				[[4, 4, 4], [4, 0, 0], [0, 0, 0]], 				[[5, 5, 0], [0, 5, 5], [0, 0, 0]], [[0, 6, 6], [6, 6, 0], [0, 0, 0]], [[7, 7], [7, 7]]], nextShape: undefined, 			grab: function() { 				let shapeInHand = this.nextShape; this.shake(); return { 					x: 3, 					y: 0, 					blocks: shapeInHand 				}; 			}, 			peek: function() { return this.nextShape; }, shake: function() { this.nextShape = this.shapes[Math.floor(Math.random() * this.shapes.length)]; game.drawPreviewShape(); }}, checkCollision: function(x, y, blocks) { 			for(let row = 0; row < blocks.length; row++) { 				for(let col = 0; col < blocks[row].length; col++) { 					if(blocks[row][col] !== 0) { 						if (row + y > this.grid.length - 1) { 				 			return true; 						} else if (row + x > this.grid[row + y].length) { 							return true; 						} else if (blocks[row][col] !== 0 && this.grid[row + y][col + x] !== 0) { 							return true; 						} 					} 				} 			} 			return false; 		}, 		currentShape: { 			shape: undefined, 			moveDown: function() { 				if(game.checkCollision(this.shape.x, this.shape.y + 1, this.shape.blocks) || this.shape.y >= game.grid.length - 2) { 					if(this.shape.y === 0) { 						game.reset(); 					} else { 						game.addShapeToGrid(this.shape); 						game.score += 5; 					} 					this.shape = game.bagOfShapes.grab(); 				} else { 					this.shape.y++; 				} 			}, 			moveLeft: function() { 				if(!game.checkCollision(this.shape.x - 1, this.shape.y, this.shape.blocks)) { 					this.shape.x--; 				} 			}, 			moveRight: function() { 				if(!game.checkCollision(this.shape.x + 1, this.shape.y, this.shape.blocks)) { 					this.shape.x++; 				} 			}, 			rotate: function() { 				function transpose(array) { 					return array[0].map(function(col, i) { 						return array.map(function(row) { 							return row[i]; 						}); 					}); 				} 				let oldBlockArrangement = this.shape.blocks; 				let newBlockArrangement = transpose(oldBlockArrangement); 				for(let i = 0; i < newBlockArrangement.length; i++) { 					newBlockArrangement[i].reverse(); 				}  				if(!game.checkCollision(this.shape.x, this.shape.y, newBlockArrangement)) { 					this.shape.blocks = newBlockArrangement; 				} 			} 		}, 		draw: function() { 			this.drawRectangle(this.context, this.canvas.width, this.canvas.height, \"black\"); 			this.drawGrid(); 			this.drawCurrentShape(); 			this.updateScore(); 		}, 		drawRectangle: function(context, width, height, color, x=0, y=0) { 			context.fillStyle = color; 			context.fillRect(x, y, width, height); 		}, 		drawGrid: function() { 			this.loopThroughBlocks(this.grid, (row, col) => { 				if(this.grid[row][col] !== 0) { 					this.drawRectangle(this.context, this.blockSize - 2, this.blockSize - 2, 						this.bagOfShapes.colors[this.grid[row][col]], 						col * this.blockSize + 1, row * this.blockSize + 1); 				} 			}); 		}, 		drawCurrentShape: function() { 			this.loopThroughBlocks(this.currentShape.shape.blocks, (row, col) => { 				if(this.currentShape.shape.blocks[row][col] !== 0) { 					this.drawRectangle(this.context, this.blockSize - 2, this.blockSize - 2, 						this.bagOfShapes.colors[this.currentShape.shape.blocks[row][col]], 						(col + this.currentShape.shape.x) * this.blockSize + 1, 						(row + this.currentShape.shape.y) * this.blockSize + 1); 				} 			}); 		}, 		drawPreviewShape: function() { this.previewShape = this.bagOfShapes.peek(); this.drawRectangle(this.previewContext, this.previewCanvas.width, this.previewCanvas.height, \"white\");             this.drawRectangle(this.previewContext, this.previewShape[0].length * this.blockSize, this.previewCanvas.height, \"black\");  			this.loopThroughBlocks(this.previewShape, (row, col) => { 			this.drawRectangle(this.previewContext, this.blockSize - 2, this.blockSize - 2, 					this.bagOfShapes.colors[this.previewShape[row][col]], col * this.blockSize + 1, row * this.blockSize + 1); }); }, loopThroughBlocks: (data, action) => { for(let row = 0; row < data.length; row++) { 				for(let col = 0; col < data[row].length; col++) { 					action(row, col); 				} 			} 		}, 		update: function() { 			this.currentShape.moveDown(); 		}, 		updateScore: function() { 			this.scoreDiv.innerHTML = this.score; 		}, 		reset: function() { 			this.score = 0; 			this.grid = [[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0], 				[0,0,0,0,0,0,0,0,0,0]];  			this.bagOfShapes.shake(); 			this.currentShape.shape = this.bagOfShapes.grab(); 		}, 		addShapeToGrid: function(shape) { 			this.loopThroughBlocks(shape.blocks, (row, col) => { 				if(shape.blocks[row][col] !== 0) { 					this.grid[row + shape.y][col + shape.x] = shape.blocks[row][col]; 				} 			}); 			this.checkAndRemoveFilledRows(); 		}, 		checkAndRemoveFilledRows: function() { 			let rowsToRemove = []; 			for(let row = 0; row < this.grid.length; row++) { 				let rowFilled = true; 				for(let col = 0; col < this.grid[row].length; col++) { 					if(this.grid[row][col] === 0) { 						rowFilled = 0; 						break; 					} 				} 				if(rowFilled) { 					rowsToRemove.push(row); 				} 			}  			if(rowsToRemove.length === 1) { 				this.score += 100; 			} else if(rowsToRemove.length === 2) { 				this.score += 500; 			} else if(rowsToRemove.length === 3) { 				this.score += 1000; 			} else if(rowsToRemove.length === 4) { 				this.score += 2500; 			}  			for(let row = rowsToRemove.length - 1; row >= 0; row--) { this.grid.splice(rowsToRemove[row], 1); } while(this.grid.length < 20) { this.grid.unshift([0,0,0,0,0,0,0,0,0,0]); }}}; game.reset(); return game; } "});
    //posts.update({PostNumber: 1}, {PostNumber: 1, Title: "Welcome to Ghoti Games", PostDate: "06/04/2017", Body: "Hello all and welcome to Ghoti Games!<p>This is a game development group, most of which is based in the Boston area. We make games during our free time as a hobby.</p>"})
    //posts.update({PostNumber: 2}, {PostNumber: 2, Title: "Game section added to site with early access to a game", PostDate: "06/05/2017", Body: "The game section of the site is now available and to show this new feature off, I have added early access to Nom. The source code for the game can be found <a href=\"https://git.ghotigames.com/dwelch/nom-html5\">here</a>. It is the bare minimal for this game, it has no menu, game over, or score."})
    //posts.update({PostNumber: 3}, {PostNumber: 3, Title: "Early access to Falling Blocks", PostDate: "06/06/2017", Body: "Game section added w/ an early game", "Body": "To continue celebrating the games page, early access to Falling Blocks has been added. The source code for the game can be found <a href=\"https://git.ghotigames.com/dwelch/falling-blocks-html5\">here</a>. Again bare minimal like Nom."})
}

function getStatusResponse(err) {
    if(err) {
        console.log(err);
        return {status: 'ERROR!'};
    } else {
        return {status: 'SUCCESS'};
    }
}

function getMaxPostNumber() {
    posts.count(setMaxPostNumber);
}

function getMaxGameNumber() {
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

function verifyPostData(postData) {
    return postData && postData.Title && postData.Body && postData.PostDate;
}

function verifyGameData(gameData) {
    return gameData && gameData.Title && gameData.Body;
}

function preparePostData(uncleanPostData) {
    maxPostNumber = maxPostNumber + 1;
    console.log('Adding post number ' + maxPostNumber);
    return {
        Title: uncleanPostData.Title,
        Body: uncleanPostData.Body,
        PostDate: uncleanPostData.PostDate,
        PostNumber: maxPostNumber
    };
}

function prepareGameData(uncleanGameData) {
    maxGameNumber = maxGameNumber + 1;
    console.log('Adding game number ' + maxGameNumber);
    return {
        Title: uncleanGameData.Title,
        Body: uncleanGameData.Body,
        GameNumber: maxGameNumber
    };
}

function addPost(req, res) {
    res.header("Content-Type", "application/json");

    if (!verifyPostData(req.body))
        return res.sendStatus(400);

    posts.insertMany([preparePostData(req.body)], {w: 1}, function(err) {
        res.send(JSON.stringify(getStatusResponse(err)));
    });
}

function addGame(req, res) {
    res.header("Content-Type", "application/json");

    if (!verifyGameData(req.body))
        return res.sendStatus(400);

    games.insertMany([prepareGameData(req.body)], {w: 1}, function(err) {
        res.send(JSON.stringify(getStatusResponse(err)));
    });
}