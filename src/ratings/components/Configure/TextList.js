import React, {Component} from 'react'
import TextArea from '@instructure/ui-core/lib/components/TextArea'

export default class TextList extends Component {
  constructor(props) {
    super(props)

    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)

    this.state = {
      text: this.props.members.map(member => member.value).join('\n')
    }
  }

  get members() {
    const lines = this.state.text.split('\n')
    const membersList = []
    const memberMap = {}

    for (let i = 0; i < lines.length; i++) {
      const memberText = lines[i].trim()
      const memberId = memberText.toLowerCase().split(' ').join('-')
      if (memberText && !memberMap[memberId]) {
        memberMap[memberId] = memberText
        membersList.push({id: memberId, value: memberText})
      }
    }

    return membersList
  }

  handleTextAreaChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    return (
      <TextArea
        label="Text Members"
        onChange={this.handleTextAreaChange}
        value={this.state.text}
      />
    )
  }
}
