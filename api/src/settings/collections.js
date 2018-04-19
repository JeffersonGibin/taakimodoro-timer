module.exports = () => {
	return {
		user : {  
			name: {type: String, required: true},  
		 	login: {type: String, required: true}, 
		 	password: {type: String, required: true}, 
		 	currentPomodoro: {type: Number, required: true, default : 0},
		 	task : [Number],
		 	pomodro : [Number]
		},

		task : {
			name: {type: String, required: true},
			status :  {type: String, required: true, default : "PENDING"},
			goal : {type: String, required: true},
			note : {type: String}
		},

		pomodoro : {
			user : {type: Number, required: true},
			task : {type: String, required: true},
			status :  {type: String, required: true, default : "ACTIVE"},
			stepAmount : {type: Number, required: true, default : 1},
			item : [{
				date : Date,
				status : String,
				note : String
			}]
		},

		settings : {
			user : {type: Number, required: true},
			shortBreak : {type: Number, required: true, default : 5},
			longBreak : {type: Number, required: true, default : 15},
			timeStep : {type: Number, required: true, default : 25}
		}
	}
}