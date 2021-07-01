
const express = require('express');
const mariadb = require('mariadb/callback');
const app = express();

app.listen('8080', () => {
	console.log('Server Started');
});

var dbc = mariadb.createConnection({
    host: "localhost",
    database: "game_DB",
    user: "root",
    password: "mymariadb"
});

dbc.connect((err) => {
	if (err) throw err;
	console.log('Database Connected');
});


app.get('/select', (req, res) => {
	var query = `SELECT name_id,name,genre,release_year,platform1,company_name,engine_name,gameName.image, introduction FROM gameName,gameCompany,gameEngine WHERE name_id=${req.query.id} and gameCompany.company_id = gameName.company_id and gameEngine.engine_id = gameName.engine_id;`;
	//console.log(query);
	dbc.query(query, (err, result, fields)=> {
		if (err) return;
		res.send(result);
	});
});




app.get('/', (req, res) => {
	var query = `select name_id, name , genre , release_year,platform1, company_name,engine_name,gameName.image from gameName, gameCompany,gameEngine where gameCompany.company_id = gameName.company_id and gameEngine.engine_id = gameName.engine_id;`;
	//console.log(query);
	dbc.query(query, (err, result, fields)=> {
		if (err) return console.log(err);
		res.send(result);
	});
});

app.get('/video_game', (req, res) => {
	var query = `select name_id, name , genre , release_year,platform1, company_name,engine_name,gameName.image from gameName, gameCompany,gameEngine where gameCompany.company_id = gameName.company_id and gameEngine.engine_id = gameName.engine_id and game_id=1;`;
	//console.log(query);
	dbc.query(query, (err, result, fields)=> {
		if (err) return console.log(err);
		res.send(result);
	});
});

app.get('/online_game', (req, res) => {
	var query = `select name_id, name , genre , release_year,platform1, company_name,engine_name,gameName.image from gameName, gameCompany,gameEngine where gameCompany.company_id = gameName.company_id and gameEngine.engine_id = gameName.engine_id and game_id=2;`;
	//console.log(query);
	dbc.query(query, (err, result, fields)=> {
		if (err) return console.log(err);
		res.send(result);
	});
});

app.get('/mobile_game', (req, res) => {
	var query = `select name_id, name , genre , release_year,platform1, company_name,engine_name,gameName.image from gameName, gameCompany,gameEngine where gameCompany.company_id = gameName.company_id and gameEngine.engine_id = gameName.engine_id and game_id=3;`;
	//console.log(query);
	dbc.query(query, (err, result, fields)=> {
		if (err) return console.log(err);
		res.send(result);
	});
});

app.get('/image_query', (req, res) => {
	var query = `SELECT image FROM gameName WHERE name_id=${req.query.id}`;
	dbc.query(query, (err, result, fields)=> {
		if (err) throw err;

		if (result[0]) {
			//console.log(__dirname + "images/" + result[0].image);
			res.sendFile(__dirname + "/game_images/" + result[0].image);
		}
		else
			res.send(404, "Not Found");
	});
});

app.use('/game_image', express.static('game_images')); //실제로 사용하는 코드

