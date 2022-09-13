import DAO from './DAO.js';
class DatabaseTasksMethods extends DAO {

  static async createTableTasks() {

    const query = `
      CREATE TABLE IF NOT EXISTS tasks(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        deadline VARCHAR NOT NULL
      )
    `

    const response = await this.createTable(query)
    return response
  }

  static async listAllTasks() {

    const query = 'SELECT * FROM tasks'

    const response = await this.listAll(query)
    return response
  }


  static async registerNewTask(task) {

    const query = `
      INSERT INTO tasks (
        name, 
        description,
        deadline        
      ) VALUES (
        ?,?,?
      )
    `

    const response = await this.insert(task, query);
    return response;
  }
}

export default DatabaseTasksMethods;