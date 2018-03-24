import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'
import TabList, {TabPanel} from '@instructure/ui-core/lib/components/TabList'

import Layout from '../shared/components/Layout'
import Compare from './components/Compare'
import Configure from './components/Configure'
import Review from './components/Review'
import {getNextMatch, filterActiveMembers, updateScoring} from './RatingAccessor'
import {getRatingData, updateRatingData} from './RatingStorage'



export default class RatingsAndRankings extends Component {
  constructor(props) {
    super(props)

    this.handleMembersUpdate = this.handleMembersUpdate.bind(this)
    this.handleMemberSelect = this.handleMemberSelect.bind(this)
    this.handleRemoveMember = this.handleRemoveMember.bind(this)
    this.handleSkip = this.handleSkip.bind(this)

    const ratingData = getRatingData()

    this.state = {
      choices: getNextMatch(ratingData.members, {}),
      allMembers: ratingData.members,
      contenders: filterActiveMembers(ratingData.members, ratingData.scoring),
      scoring: ratingData.scoring
    }
  }

  handleMembersUpdate(members) {
    const choices = getNextMatch(members, this.state.scoring)
    updateRatingData({members})
    this.setState({choices, allMembers: members, contenders: members})
  }

  handleMemberSelect(member) {
    const [memberA, memberB] = this.state.choices
    let scoring
    if (member === memberA) {
      scoring = updateScoring(memberA, memberB, this.state.scoring)
    } else {
      scoring = updateScoring(memberB, memberA, this.state.scoring)
    }

    updateRatingData({scoring})

    this.setState(state => {
      state.scoring = scoring
      state.contenders = filterActiveMembers(state.contenders, scoring)
      state.choices = getNextMatch(state.contenders, scoring)
      return state
    })
  }

  handleRemoveMember(memberToRemove) {
    console.log(memberToRemove)
    const allMembers = this.state.allMembers.filter(member => member.id !== memberToRemove.id)
    const contenders = this.state.contenders.filter(member => member.id !== memberToRemove.id)
    const scoring = {...this.state.scoring}
    Object.keys(scoring).forEach(memberId => {
      if (memberId === memberToRemove.id) {

      } else if (scoring[memberId].losses.includes(memberToRemove.id)) {
        const memberScore = {...scoring[memberId]}
        const losses = scoring[memberId].losses.filter(lossId => lossId !== memberToRemove.id)
        scoring[memberId] = memberScore
      }
    })
    const choices = getNextMatch(contenders, scoring)
    updateRatingData({members: allMembers, scoring})
    this.setState({allMembers, contenders, choices, scoring})
  }

  handleSkip() {
    this.setState({
      choices: getNextMatch(this.state.contenders, this.state.scoring)
    })
  }

  render() {
    return (
      <Layout page="eloRatings">
        <Container as="header" margin="medium medium 0 medium">
          <Heading level="h2">Rating</Heading>
        </Container>

        <TabList margin="medium">
          <TabPanel title="Compare">
            <Compare
              onRemove={this.handleRemoveMember}
              onSelect={this.handleMemberSelect}
              onSkip={this.handleSkip}
              memberA={this.state.choices[0]}
              memberB={this.state.choices[1]}
            />
          </TabPanel>

          <TabPanel title="Configure">
            <Configure
              onMembersUpdate={this.handleMembersUpdate}
              members={this.state.allMembers}
            />
          </TabPanel>

          <TabPanel title="Review">
            <Review
              contenders={this.state.contenders}
              onRemove={this.handleRemoveMember}
              members={this.state.allMembers}
              scoring={this.state.scoring}
            />
          </TabPanel>
        </TabList>
      </Layout>
    )
  }
}
