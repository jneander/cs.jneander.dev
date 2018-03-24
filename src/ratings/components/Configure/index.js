import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'

import TextList from './TextList'

export default class Configure extends Component {
  constructor(props) {
    super(props)

    this.bindTextList = ref => {this.textList = ref}

    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    this.props.onMembersUpdate(this.textList.members)
  }

  render() {
    return (
      <Container as="div">
        <TextList
          members={this.props.members}
          ref={this.bindTextList}
        />

        <Button onClick={this.handleSave}>Save</Button>
      </Container>
    )
  }
}
