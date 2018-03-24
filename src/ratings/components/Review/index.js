import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import Table from '@instructure/ui-core/lib/components/Table'

import {getScore} from '../../RatingAccessor'

export default class Review extends Component {
  render() {
    const membersWithScore = this.props.members.map((member, index) => (
      {
        id: member.id,
        index,
        isContender: this.props.contenders.indexOf(member) !== -1,
        score: getScore(member, this.props.scoring),
        value: member.value
      }
    ))

    membersWithScore.sort((memberA, memberB) => {
      if (memberA.score === memberB.score) {
        return memberA.index - memberB.index
      } else if (memberA.score > memberB.score) {
        return -1
      }
      return 1
    })

    return (
      <Container as="div">
        <Table caption="Ratings">
          <thead>
            <tr>
              <th>Member</th>
              <th>Score</th>
              <th>Contender</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {membersWithScore.map(member => (
              <tr key={member.id}>
                <th>{member.value}</th>
                <td>{member.score}</td>
                <td>{member.isContender ? 'Yes' : 'No'}</td>
                <td>
                  <Button size="small" onClick={() => {this.props.onRemove(member)}}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    )
  }
}
