const K_VALUE = 32

function shuffle(array) {
  const arrayCopy = [...array]
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const x = arrayCopy[i]
    arrayCopy[i] = arrayCopy[j]
    arrayCopy[j] = x
  }
  return arrayCopy
}

export function getNextOptions(options, ratingData) {
  if (options.length >= 2) {
    const randomizedOptions = shuffle(options)
    for (let i = 0; i < randomizedOptions.length - 1; i++) {
      for (let j = i + 1; j < randomizedOptions.length; j++) {
        const optionA = randomizedOptions[i]
        const optionB = randomizedOptions[j]
        const optionALosses = getRatingDatum(optionA, ratingData).losses
        const optionBLosses = getRatingDatum(optionB, ratingData).losses
        if (optionALosses.indexOf(optionB) === -1 && optionBLosses.indexOf(optionA) === -1) {
          return [optionA, optionB]
        }
      }
    }
  }
  return []
}

export function getRatingDatum(option, ratingData) {
  return ratingData[option] || {losses: [], score: 0}
}

export function getScore(option, ratingData) {
  return getRatingDatum(option, ratingData).score
}

export function updateRating(optionA, optionB, ratingData) {
  const ratingDatumA = getRatingDatum(optionA, ratingData)
  const ratingDatumB = getRatingDatum(optionB, ratingData)

  const currentRatingA = getScore(optionA, ratingData)
  const currentRatingB = getScore(optionB, ratingData)

  const transformedRatingA = Math.pow(10, currentRatingA / 400)
  const transformedRatingB = Math.pow(10, currentRatingB / 400)
  const expectedScoreA = transformedRatingA / (transformedRatingA + transformedRatingB)
  const expectedScoreB = transformedRatingB / (transformedRatingA + transformedRatingB)
  const scoreA = 1
  const scoreB = 0
  const ratingA = currentRatingA + K_VALUE * (scoreA - expectedScoreA)
  const ratingB = currentRatingB + K_VALUE * (scoreB - expectedScoreB)

  const losses = ratingDatumB.losses.concat([optionA])

  return {
    ...ratingData,
    [optionA]: {...ratingDatumA, score: ratingA},
    [optionB]: {...ratingDatumB, score: ratingB, losses}
  }
}

export function updateContenders(options, ratingData) {
  return options.filter(option => getRatingDatum(option, ratingData).losses.length < 5)
}
