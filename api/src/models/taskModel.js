const TaskModel = () => {

	const Schema = app.models.db.Schema;
	const taskSchema = app.settings.collections.task;
	const taskDataSchema = new Schema(taskSchema, {collection: 'task'});
	const Task = app.models.db.model('TaskData', taskDataSchema);

	return {
		insert : (_data) => {
			let data = new Task(_data);
			return data.save();	
		},

		update : (_id, _data) => {
			_data.updateAt = new Date();
			return Task.update(_id, _data);
		},

		getTaskByName : (_taskName) => {
			return Task.findOne({
				name : _taskName
			}).then((res) => {
				return res ? res.name : false;
			});
		},
	}
};

module.exports = () => {
	return TaskModel();
};