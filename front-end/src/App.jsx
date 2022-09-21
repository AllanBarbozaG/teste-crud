import { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import FormInput from "./components/formInput/FormInput";
import UpdateChampion from "./components/UpdateChampion/UpdateChampion";

import {
  deleteChampion,
  listAllChampions,
  registerNewChampion,
  updateChampion,
} from "./service/championsRequests";

function App() {
  const [sendRegisterChampions, setSendRegisterChampion] = useState(false);
  const [sendDeleteChampion, setSendDeleteChampion] = useState(false);

  const [showAddChampionForm, setShowAddChampionForm] = useState(false);
  const [showChampionsList, setShowChampionsList] = useState(false);
  const [showUpdateChampionForm, setShowUpdateChampionForm] = useState(false);
  const [showDeleteChampionForm, setShowDeleteChampionForm] = useState(false);

  const [championsList, setChampionsList] = useState([]);

  const [championId, setChampionId] = useState();
  const [championName, setChampionName] = useState();
  const [championCard, setChampionCard] = useState();
  const [championAbility, setChampionAbility] = useState();
  const [championDescription, setChampionDescription] = useState();

  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    listAllChampions()
      .then((data) => {
        setChampionsList(data);
      })
      .catch((error) => console.log(error));
  }, [selectedMethod]);

  useEffect(() => {
    if (sendRegisterChampions) {
      registerNewChampion(
        championName,
        championCard,
        championAbility,
        championDescription
      )
        .then((json) => {
          console.log(json);
        })
        .catch((error) => console.log(error));
      setSendRegisterChampion(false);
    }
  }, [sendRegisterChampions]);

  useEffect(() => {
    if (sendDeleteChampion) {
      deleteChampion(championId)
        .then((json) => {
          console.log(json);
        })
        .catch((error) => console.log(error));
      setSendDeleteChampion(false);
    }
  }, [sendDeleteChampion]);

  return (
    <div id="shadow">
      <div className="App">
        <select
          name="methods"
          id="methods-select"
          value="O que deseja fazer?"
          onChange={(e) => {
            if (e.target.value == "registerChampion") {
              setShowChampionsList(false);
              setShowUpdateChampionForm(false);
              setShowDeleteChampionForm(false);
            } else if (e.target.value == "listChampions") {
              setShowAddChampionForm(false);
              setShowUpdateChampionForm(false);
              setShowDeleteChampionForm(false);
            } else if (e.target.value == "updateChampion") {
              setShowAddChampionForm(false);
              setShowChampionsList(false);
              setShowDeleteChampionForm(false);
            } else if (e.target.value == "deleteChampion") {
              setShowChampionsList(false);
              setShowUpdateChampionForm(false);
              setShowAddChampionForm(false);
            }
            setSelectedMethod(e.target.value);
          }}
        >
          <option value="">O que deseja fazer?</option>
          <option value="listChampions">Listar Campeões</option>
          <option value="registerChampion">Registrar Campeão</option>
          <option value="updateChampion">Atualizar Campeão</option>
          <option value="deleteChampion">Deletar Campeão</option>
        </select>

        <main id="main">
          {selectedMethod == "listChampions" &&
            championsList.map((champion, index) => {
              return (
                <div
                  id={`champion-card-id-${index}`}
                  className="championCard"
                  key={index}
                >
                  <img src={champion.image} alt="imagem" />

                  <div id="champion-infos">
                    <p>{champion.name}</p>

                    <p>{champion.ability}</p>

                    <p>{champion.description}</p>
                  </div>
                </div>
              );
            })}
          {selectedMethod == "registerChampion" && (
            <form action="send">
              <FormInput
                name="champions-name"
                placeholder="nome do campeão"
                callback={(e) => {
                  setChampionName(e.target.value);
                }}
              />

              <FormInput
                name="champions-img"
                placeholder="link da imagem do campeão"
                callback={(e) => {
                  setChampionCard(e.target.value);
                }}
              />

              <FormInput
                name="champions-deadline"
                placeholder="habilidade do campeão"
                callback={(e) => {
                  setChampionAbility(e.target.value);
                }}
              />

              <FormInput
                name="champions-description"
                placeholder="descrição do campeão"
                callback={(e) => {
                  setChampionDescription(e.target.value);
                }}
              />
              <Button
                type="submit"
                text="Registrar Campeão"
                callback={(e) => {
                  e.preventDefault();
                  setSendRegisterChampion(true);
                }}
              />
            </form>
          )}
          {selectedMethod == "updateChampion" && (
            <form action="send">
              <FormInput
                type="number"
                name="champions-id"
                placeholder="id do campeão"
                callback={(e) => {
                  setChampionId(e.target.value);
                }}
              />
              {championId && (
                <UpdateChampion
                  championId={championId}
                  setChampionId={setChampionId}
                />
              )}
            </form>
          )}
          {selectedMethod == "deleteChampion" && (
            <div id="delete-div">
              <FormInput
                name="champions-id"
                placeholder="id do campeão"
                callback={(e) => {
                  setChampionId(e.target.value);
                }}
              />

              <Button
                type="submit"
                text="Deletar Campeão"
                callback={(e) => {
                  e.preventDefault();
                  setSendDeleteChampion(true);
                }}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
