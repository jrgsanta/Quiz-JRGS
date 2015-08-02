var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res){
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs',{ quizes: quizes});
	})
};

// GET /author
exports.author = function(req, res){
	res.render('author', {nombre: 'Juan Ramón García'});
};

// GET /quizes/:id
exports.show = function(req, res){
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{ quiz: quiz})
	})
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
//	if (req.query.respuesta === 'Roma'){
//		res.render('quizes/answer', {respuesta: 'Correcto'});
//	} else {
//		res.render('quizes/answer', {respuesta: 'Incorrecto'});
//	}
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer',{ quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer',{ quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};