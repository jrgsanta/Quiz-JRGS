var path = require('path');

// Cargar el modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
						{dialect: "sqlite", storage: "quiz.sqlite"}
					);

// Importar la definición de la tabla de quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
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