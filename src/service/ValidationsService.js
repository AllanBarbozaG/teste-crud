export default class ValidationsService {

  static validateChampionName(championName) {
    if (!championName) {
      return false
    } else {
      return true
    }
  }

  static validateChampionDescription(championDescription) {
    if (!championDescription) {
      return false
    } else {
      return true
    }
  }

  static validateChampionImg(championImg) {
    if (!championImg) {
      return false 
    } else {
      return true
    }
  }

  static validateChampionAbility(championAbility) {
    if (!championAbility) {
      return false
    } else {
      return true
    }
  }

  static validateChampion(championName, championImg, championAbility, championDescription) {
    return this.validateChampionName(championName) &&
           this.validateChampionImg(championImg) &&
           this.validateChampionAbility(championAbility) &&
           this.validateChampionDescription(championDescription)

  }
}