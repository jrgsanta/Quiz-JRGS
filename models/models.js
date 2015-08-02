var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name		= (url[6]||null);
var user		= (url[2]||null);
var pwd			= (url[3]||null);
var protocol	= (url[1]||null);
var dialect		= (url[1]||null);
var port		= (url[5]||null);
var host		= (url[4]||null);
var storage		= process.env.DATABASE_STORAGE;

// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
//var sequelize = new Sequelize(null, null, null,
//						{dialect: "sqlite", storage: "quiz.sqlite"}
//					);

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
{ 	dialect: protocol,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage,
	omitNull: true
});

// Importar la definición de la tabla de quiz
//var Quiz = sequelize.import(path.join(__dirname,'quiz'));
var	quiz_path = path.join(__dirname,'quiz');
var quiz = sequelize.import(quiz_path);

// Exportar definición de la tabla de Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa la tabla de preguntas.
sequelize.sync().success(function(){
	Quiz.count().success(function (count){
		if(count === 0){
			Quiz.create({ 	pregunta: 'Capital de Italia',
							respuesta: 'Roma'
						})
			.success(function(){console.log('Vase de datos inici')});
		};
	});
});