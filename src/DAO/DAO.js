import Database from "../database/database.js";

class DAO {

  static async activateForeignKeys() {

    const query = 'PRAGMA foreign_keys = ON'

    Database.run(query, error => {

      if (error) {
        console.log(error);
      } else {
        console.log("Chaves estrangeiras funcionando")
      }
    })
  }

  static createTable(query) {

    return new Promise((resolve, reject) => {

      Database.run(query, (error) => {
        if (error) {
          reject(error.message)
        } else {
          resolve("Tabela criada")
        }
      })
    })
  }

  static listAllTasks(query) {

    return new Promise((resolve, reject) => {
      Database.all(query, (error, res) => {
        if (error) {
          reject(error.message)
        } else {
          resolve(res)
        }
      })
    })
  }

  static insertNewTask(task, query) {

    const reqBody = Object.values(task)

    return new Promise((resolve, reject) => {

      Database.run(query, [...reqBody], (error) => {
        if(error) {
          reject(error.message)
        } else {
          resolve("Tarefa incluída com sucesso.")
        }
      })
    })
  }
}

export default DAO;