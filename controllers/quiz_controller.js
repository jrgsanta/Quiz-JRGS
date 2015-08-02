var models = require('../models/models.js');

// GET /quizes/question
exports.question = function(req, res){
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question',{ pregunta: quiz[0].pregunta})
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