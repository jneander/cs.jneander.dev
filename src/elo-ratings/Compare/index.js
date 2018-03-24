import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import Grid, {GridCol, GridRow} from '@instructure/ui-core/lib/components/Grid'
import Text from '@instructure/ui-core/lib/components/Text'

export default class Compare extends Component {
  render() {
    const {optionA, optionB} = this.props

    if (optionA && optionB) {
      return (
        <Container as="div">
          <Grid>
            <GridRow>
              <GridCol textAlign="center">
                <Button onClick={() => {this.props.onSelect(optionA)}}>{optionA}</Button>
              </GridCol>

              <GridCol textAlign="center">
                <Button onClick={() => {this.props.onSelect(optionB)}}>{optionB}</Button>
              </GridCol>

              <GridCol textAlign="center">
                <Button onClick={this.props.onSkip}>Skip</Button>
              </GridCol>
            </GridRow>
          </Grid>
        </Container>
      )
    }

    return (
      <Container as="div">
        <Text>All choices have been compared.</Text>
      </Container>
    )
  }
}
