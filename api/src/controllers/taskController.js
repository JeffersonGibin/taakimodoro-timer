
const TaskController = () => {
	const TaskModel = app.models.taskModel;

	const Controller = {

		save : (req, res) => {
			return TaskModel.getTaskByName(req.body.name).then((task) => {
				return !task ? TaskModel.insert(req.body) : false;
			});
		},

		updateAll : (req, res) => {
			return TaskModel.update(
				{sequence : req.params.sequence}, 
				{goal : req.body.goal, note : req.body.note}
			);
		},

		updateStatus : (_id, newStatus) => {
			return TaskModel.update(
				{sequence : _id}, 
				{status : newStatus}
			);
		}
	}

	return Controller;
};

module.exports = () => {
	return TaskController();
};