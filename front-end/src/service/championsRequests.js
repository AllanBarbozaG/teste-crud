export function listAllChampions() {

  const url = "http://localhost:3002/campeoes"

  return fetch(url, {
    method: "GET",
    moede: "cors"
  }).then((response) => {
    return response.json()
  })
}

export function registerNewChampion(championName, championCard, championAbility, championDescription) {

  const newChampion = {
    "name": championName,
    "image": championCard,
    "ability": championAbility,
    "description": championDescription
  }

  const url = "http://localhost:3002/campeoes"

  return fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(newChampion),
    headers: {
      "content-type": "application/json"
    }
  }).then((response) => response.json())
}

export function updateChampion(id, championName, championCard, championAbility, championDescription) {

  const updatedChampion = {
    "name": championName,
    "image": championCard,
    "ability": championAbility,
    "description": championDescription
  }

  const url = `http://localhost:3002/campeoes/${id}`

  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(updatedChampion),
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())
}

export function deleteChampion(id) {

  const url = `http://localhost:3002/campeoes/${id}`

  return fetch(url, {
    method: "DELETE",
    mode: "cors"
  }).then((response) => {
    return response.json()
  })
}