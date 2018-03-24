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

export function getNextMatch(options, scoring) {
  if (options.length >= 2) {
    const randomizedOptions = shuffle(options)
    for (let i = 0; i < randomizedOptions.length - 1; i++) {
      for (let j = i + 1; j < randomizedOptions.length; j++) {
        const optionA = randomizedOptions[i]
        const optionB = randomizedOptions[j]
        const optionALosses = getRatingDatum(optionA, scoring).losses
        const optionBLosses = getRatingDatum(optionB, scoring).losses
        if (optionALosses.indexOf(optionB.id) === -1 && optionBLosses.indexOf(optionA.id) === -1) {
          return [optionA, optionB]
        }
      }
    }
  }
  return []
}

function longestLossChainById(memberId, scoring, idsInChain) {
  if (!scoring[memberId]) {
    return 0
  }

  const nextLevelIds = scoring[memberId].losses
  const nextLevelLosses = nextLevelIds.map(nextLevelId => {
    if (idsInChain.includes(nextLevelId)) {
      return 1
    }
    return 1 + longestLossChainById(nextLevelId, scoring, [...idsInChain, nextLevelId])
  })
  return Math.max(0, ...nextLevelLosses)
}

export function findLongestLossChain(member, scoring) {
  return longestLossChainById(member.id, scoring, [member.id])
}

export function getRatingDatum(member, scoring) {
  return scoring[member.id] || {losses: [], score: 0}
}

export function getScore(member, scoring) {
  return getRatingDatum(member, scoring).score
}

export function updateScoring(optionA, optionB, scoring) {
  const ratingDatumA = getRatingDatum(optionA, scoring)
  const ratingDatumB = getRatingDatum(optionB, scoring)

  const currentRatingA = getScore(optionA, scoring)
  const currentRatingB = getScore(optionB, scoring)

  const transformedRatingA = Math.pow(10, currentRatingA / 400)
  const transformedRatingB = Math.pow(10, currentRatingB / 400)
  const expectedScoreA = transformedRatingA / (transformedRatingA + transformedRatingB)
  const expectedScoreB = transformedRatingB / (transformedRatingA + transformedRatingB)
  const scoreA = 1
  const scoreB = 0
  const ratingA = currentRatingA + K_VALUE * (scoreA - expectedScoreA)
  const ratingB = currentRatingB + K_VALUE * (scoreB - expectedScoreB)

  const losses = ratingDatumB.losses.concat([optionA.id])

  return {
    ...scoring,
    [optionA.id]: {...ratingDatumA, score: ratingA},
    [optionB.id]: {...ratingDatumB, score: ratingB, losses}
  }
}

export function filterActiveMembers(members, scoring) {
  return members.filter(member => findLongestLossChain(member, scoring) < 12)
}
