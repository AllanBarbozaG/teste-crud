import DatabaseTasksMethods from "../DAO/DatabaseTasksMethods.js";

DatabaseTasksMethods.createTableTasks()

class Tasks {

  static async routes(app) {

    app.get("/tasks", async (req, res) => {
      const response = await DatabaseTasksMethods.listAllTasks();
      res.status(200).json(response);
    })

    app.post("/tasks", async (req, res) => {

      const newTask = Object.values(req.body)

      try {
        const response = DatabaseTasksMethods.registerNewTask(newTask)        
        res.status(201).json(response)
      } catch (error) {
        res.status(400).json(error.message)
      }
    })

  }

}

export default Tasks;