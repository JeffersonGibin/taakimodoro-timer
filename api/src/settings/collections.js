module.exports = () => {
	return {
		user : {  
			name: {type: String, required: true},  
		 	login: {type: String, required: true}, 
		 	password: {type: String, required: true}, 
		 	currentPomodoro: {type: Number, required: true, default : 0},
		 	task : Array,
		 	pomodro : Array
		},

		task : {
			name: {type: String, required: true},
			status :  {type: String, required: true, default : "PENDENTE"},
			date : {type: Date, default: Date.now},
			goal : {type: String, required: true},
			note : {type: String}
		},

		pomodoro : {
			date : Date,
			user : Array,
			task : {type: String, required: true},
			status :  {type: String, required: true, default : "ATIVO"},
			duration : Number,
			note : String
		}
	}
}