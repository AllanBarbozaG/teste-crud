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

  static listAll(query) {

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

  static listChampion(id, query) {
    return new Promise((resolve, reject) => {
      Database.get(query, id, (error, result) => {
        if (error) {
          reject(error.message)
        } else {
          resolve(result)
        }
      })
    })
  }

  static async insert(champion, query) {

    const reqBody = Object.values(champion)

    return new Promise((resolve, reject) => {

      Database.run(query, [...reqBody], (error) => {
        if (error) {
          reject({ error: true, message: error.message })
        } else {
          resolve("Campeão registrado com sucesso.")
        }
      })
    }).catch(error => console.log(error))
  }

  static update(id, entity, query) {
    const body = Object.values(entity)

    return new Promise((resolve, reject) => {
      Database.run(query, [...body, id], (error) => {
        if (error) {
          reject(error.message)
        } else {
          resolve("Campeão atualizado com sucesso.")
        }
      })
    })
  }

  static deleteById(query, id) {
    return new Promise((resolve, reject) => {
      Database.run(query, id, (error) => {
        if (error) {
          reject(error.message)
        } else {
          resolve("Campeão deletado com sucesso.")
        }
      })
    })
  }
}

export default DAO;