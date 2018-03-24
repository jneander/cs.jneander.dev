import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import TextArea from '@instructure/ui-core/lib/components/TextArea'

export default class Configure extends Component {
  constructor(props) {
    super(props)

    this.handleSave = this.handleSave.bind(this)
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)

    this.state = {
      text: this.props.options.join('\n')
    }
  }

  handleSave() {
    const lines = this.state.text.split('\n')
    const options = []
    for (let i = 0; i < lines.length; i++) {
      const option = lines[i].trim()
      if (option) {
        options.push(option)
      }
    }
    this.setState({text: options.join('\n')}, () => {
      this.props.onOptionsChange(options)
    })
  }

  handleTextAreaChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    return (
      <Container as="div">
        <TextArea
          label="Candidates"
          onChange={this.handleTextAreaChange}
          value={this.state.text}
        />

        <Button onClick={this.handleSave}>Save</Button>
      </Container>
    )
  }
}
