const STORAGE_KEY = '@jneander/learning/ratings'

export function getRatingData() {
  const ratingData = window.localStorage.getItem(STORAGE_KEY)
  const value = ratingData ? JSON.parse(ratingData) : {members: [], scoring: {}}
  console.log(value)
  return value
}

export function updateRatingData(data) {
  const saveData = {
    ...getRatingData(),
    ...data
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData))
}
