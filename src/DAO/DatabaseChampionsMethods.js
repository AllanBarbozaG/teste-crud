import DAO from './DAO.js';
class DatabaseChampionsMethods extends DAO {

  static async createTableChampions() {
    const query = `
      CREATE TABLE IF NOT EXISTS champions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR NOT NULL,
        image VARCHAR NOT NULL,
        ability VARCHAR,
        description VARCHAR NOT NULL 
      )
    `

    const response = await this.createTable(query)
    return response
  }

  static async listAllChampions() {
    const query = 'SELECT * FROM champions'

    const response = await this.listAll(query)
    return response
  }

  static async listChampionById(id) {
    const query = `SELECT * FROM champions WHERE id = ?`

    const response = await this.listChampion(id, query)
    return response
  }

  static async updateChampionById(id, entity) {
    const query = `UPDATE champions SET name = ?, image = ?, ability = ?, description = ? WHERE id = ?`

    const response = await this.update(id, entity, query)
    return response
  }

  static async registerNewChampion(champion) {
    const query = `
      INSERT INTO champions (
        name, 
        image,
        ability,
        description       
      ) VALUES (
        ?,?,?,?
      )
    `

    const response = await this.insert(champion, query);
    return response;
  }

  static async deleteChampionById(id) {
    const query = `DELETE FROM champions WHERE id = ?`

    const response = await this.deleteById(query, id);
    return response;
  }


}

export default DatabaseChampionsMethods;