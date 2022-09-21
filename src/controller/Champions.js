import DatabaseChampionsMethods from "../DAO/DatabaseChampionsMethods.js";
import ValidationsService from "../service/ValidationsService.js";

DatabaseChampionsMethods.createTableChampions();
class Champions {

  static async routes(app) {

    app.get("/campeoes", async (req, res) => {
      const response = await DatabaseChampionsMethods.listAllChampions();
      res.status(200).json(response);
    })

    app.post("/campeoes", async (req, res) => {
      const validateChampion = ValidationsService.validateChampion(...Object.values(req.body));

      try {
        if (validateChampion) {
          const newChampion = Object.values(req.body);
          const response = await DatabaseChampionsMethods.registerNewChampion(newChampion);
          res.status(201).json(response);
        } else {
          throw new Error('Registro não incluído. Revise as informações do campeão.');
        }
      } catch (error) {
        res.status(400).json(error.message);
      }
    })

    app.put("/campeoes/:id", async (req, res) => {
      const validateChampion = ValidationsService.validateChampion(...Object.values(req.body));  
      console.log(Object.values(req.body))   
      const findChampion = await DatabaseChampionsMethods.listChampionById(req.params.id);
      console.log(validateChampion)
      console.log(findChampion)
    
      try {
        if (!findChampion) {
          throw new Error("Campeão não encontrado.")
        }
        if (validateChampion) {
          const champion = Object.values(req.body)

          const response = await DatabaseChampionsMethods.updateChampionById(req.params.id, champion)
          console.log(response)
          res.status(201).json(response)
        } else {
          throw new Error("Campeão não atualizado.")
        }
      } catch (error) {        
        res.status(400).json(error.message)
      }
    })

    app.delete("/campeoes/:id", async (req, res) => {
      try {
        const findChampion = await DatabaseChampionsMethods.listChampionById(req.params.id);

        if (!findChampion) {
          throw new Error("Campeão não encontrado.");
        } else {
          const deleteChampion = await DatabaseChampionsMethods.deleteChampionById(req.params.id)
          res.status(200).json(deleteChampion)
        }
      } catch (error) {
        res.status(404).json(error.message)
      }
    })
  }

  

}

export default Champions;