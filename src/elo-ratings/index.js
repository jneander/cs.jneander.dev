import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'
import TabList, {TabPanel} from '@instructure/ui-core/lib/components/TabList'

import Layout from '../shared/components/Layout'
import Compare from './Compare'
import Configure from './Configure'
import {getNextOptions, updateContenders, updateRating} from './RatingAccessor'
import {getEloData, updateEloData} from './RatingStorage'
import Review from './Review'

export default class EloRating extends Component {
  constructor(props) {
    super(props)

    this.handleOptionsChange = this.handleOptionsChange.bind(this)
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
    this.handleSkip = this.handleSkip.bind(this)

    const eloData = getEloData()

    this.state = {
      choices: getNextOptions(eloData.options, {}),
      allOptions: eloData.options,
      contenders: eloData.options,
      ratingData: eloData.ratingData
    }
  }

  handleOptionsChange(options) {
    const choices = getNextOptions(options, this.state.ratingData)
    updateEloData({options})
    this.setState({choices, allOptions: options, contenders: options})
  }

  handleOptionSelect(option) {
    const [optionA, optionB] = this.state.choices
    let ratingData
    if (option === optionA) {
      ratingData = updateRating(optionA, optionB, this.state.ratingData)
    } else {
      ratingData = updateRating(optionB, optionA, this.state.ratingData)
    }

    updateEloData({ratingData})

    this.setState(state => {
      state.ratingData = ratingData
      state.contenders = updateContenders(state.contenders, ratingData)
      state.choices = getNextOptions(state.contenders, ratingData)
      return state
    })
  }

  handleSkip() {
    this.setState({
      choices: getNextOptions(this.state.contenders, this.state.ratingData)
    })
  }

  render() {
    return (
      <Layout page="eloRatings">
        <Container as="header" margin="medium medium 0 medium">
          <Heading level="h2">Elo Ratings</Heading>
        </Container>

        <TabList margin="medium">
          <TabPanel title="Compare">
            <Compare
              onSelect={this.handleOptionSelect}
              onSkip={this.handleSkip}
              optionA={this.state.choices[0]}
              optionB={this.state.choices[1]}
            />
          </TabPanel>

          <TabPanel title="Configure">
            <Configure
              onOptionsChange={this.handleOptionsChange}
              options={this.state.allOptions}
            />
          </TabPanel>

          <TabPanel title="Review">
            <Review
              options={this.state.allOptions}
              contenders={this.state.contenders}
              ratingData={this.state.ratingData}
            />
          </TabPanel>
        </TabList>
      </Layout>
    )
  }
}
