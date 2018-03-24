export function getEloData() {
  const eloData = window.localStorage.getItem('elo-data')
  return eloData ? JSON.parse(eloData) : {options: [], ratingData: {}}
}

export function updateEloData(data) {
  const saveData = {
    ...getEloData(),
    ...data
  }
  window.localStorage.setItem('elo-data', JSON.stringify(saveData))
}
