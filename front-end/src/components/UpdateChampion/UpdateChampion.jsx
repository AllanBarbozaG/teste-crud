import FormInput from "../formInput/FormInput";
import Button from "../Button/Button";
import { updateChampion } from "../../service/championsRequests";
import { useState, useEffect } from "react";
import { listAllChampions } from "../../service/championsRequests";
import "./UpdateChampion.css";

function UpdateChampion({ championId }) {
  const [sendUpdateChampion, setSendUpdateChampion] = useState(false);

  const [currentChampionName, setCurrentChampionName] = useState();
  const [currentChampionCard, setCurrentChampionCard] = useState();
  const [currentChampionAbility, setCurrentChampionAbility] = useState();
  const [currentChampionDescription, setCurrentChampionDescription] = useState();

  const [championName, setChampionName] = useState();
  const [championCard, setChampionCard] = useState();
  const [championAbility, setChampionAbility] = useState();
  const [championDescription, setChampionDescription] = useState();

  console.log("NAME: " + championName);

  useEffect(() => {
    listAllChampions()
      .then((data) => {
        data.map((champion) => {
          if (champion.id == championId) {
            setCurrentChampionName(champion.name);
            setCurrentChampionCard(champion.image);
            setCurrentChampionAbility(champion.ability);
            setCurrentChampionDescription(champion.description);
          }
        });
      })
      .catch((error) => console.log(error));
  }, [championId]);

  useEffect(() => {
    if (sendUpdateChampion) {
      updateChampion(
        championId,
        championName,
        championCard,
        championAbility,
        championDescription
      )
        .then((json) => console.log(json))
        .catch((error) => console.log(error));
      setSendUpdateChampion(false);
    }
  }, [sendUpdateChampion]);

  return (
    <>
      <div id="update-div">
        <div id="curret-champion-infos">
          <h5>Informações atuais</h5>

          <label htmlFor="name">Nome</label>
          <br />
          <input
            name="name"
            className="champion-info"
            value={currentChampionName}
            readOnly
          />
          <br />
          <label htmlFor="card">Link da imagem</label>
          <br />
          <input
            name="card"
            className="champion-info"
            value={currentChampionCard}
            readOnly
          />
          <br />
          <label htmlFor="ability">Habiliade</label>
          <br />
          <input
            name="ability"
            className="champion-info"
            value={currentChampionAbility}
            readOnly
          />
          <br />
          <label htmlFor="description">Descrição</label>
          <br />
          <input
            name="description"
            className="champion-info"
            value={currentChampionDescription}
            readOnly
          />
        </div>

        <div id="inputs-div">
          <h5>Informações Atualizadas</h5>

          <FormInput
            type="text"
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
            text="Atualizar Campeão"
            callback={(e) => {
              e.preventDefault();
              setSendUpdateChampion(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default UpdateChampion;
