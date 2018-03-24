import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Table from '@instructure/ui-core/lib/components/Table'

import {getScore} from '../RatingAccessor'

export default class Review extends Component {
  render() {
    const optionsWithScore = this.props.options.map((option, index) => (
      {
        index,
        isContender: this.props.contenders.indexOf(option) !== -1,
        option,
        score: getScore(option, this.props.ratingData)
      }
    ))
    optionsWithScore.sort((optionA, optionB) => {
      if (optionA.score === optionB.score) {
        return optionA.index - optionB.index
      } else if (optionA.score > optionB.score) {
        return -1
      }
      return 1
    })

    return (
      <Container as="div">
        <Table caption="Ratings">
          <thead>
            <tr>
              <th>Option</th>
              <th>Score</th>
              <th>Contender</th>
            </tr>
          </thead>

          <tbody>
            {optionsWithScore.map(option => (
              <tr key={option.option}>
                <th>{option.option}</th>
                <td>{option.score}</td>
                <td>{option.isContender ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }
}
