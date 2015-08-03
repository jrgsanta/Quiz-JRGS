var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId='+ quizId));}
		}
	).catch(function(error){next(error);});
};


// GET /quizes
exports.index = function(req, res){
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes',{ quizes: quizes});
	}
	).catch(function(error){next(error);})
};

// GET /author
exports.author = function(req, res){
	res.render('author', {nombre: 'Juan Ramón García'});
};

// GET /quizes/:id
exports.show = function(req, res){
	//res.render('quizes/question', {pregunta: 'Capital de Italia'});
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show',{ quiz: req.quiz})
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
		if (req.query.respuesta === req.quiz.respuesta){
			res.render('quizes/answer',{ quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer',{ quiz: req.quiz, respuesta: 'Incorrecto'});
		}
	})
};