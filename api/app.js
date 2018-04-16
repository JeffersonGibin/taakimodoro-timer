const 
  express = require('express'),
  bodyParser = require('body-parser'),
  consign = require('consign')
  mongoose = require('mongoose'),
  crypto = require('crypto'),
  jwt = require('jsonwebtoken');
  
app = express();

app.mongoose = mongoose;

app.crypto = crypto;

app.jwt = jwt;

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

/* autoload */
consign({cwd: 'src'})
  .include('settings')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app);

/* Rota inicial */
app.get('/', (req, res) => {
    res.send({msg : "Taakimodoro API", version: "1.0.0"});
});

/*Tramento para rotas não encontradas*/
app.use(function(req, res) {
    res.status(404).send({msg : "Route is not found!", status: 404});
});

//Tratamento para erros internos
app.use(function(error, req, res, next) {
    res.status(500).send({msg : "Internal Server Error", status: 500});
});

const settingsServer = app.settings.defaultSettings.getServer();

module.exports = () => {
	return {
       PORT : settingsServer.port,
       server : app
	}
};