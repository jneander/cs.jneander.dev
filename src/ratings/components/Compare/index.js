import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import Grid, {GridCol, GridRow} from '@instructure/ui-core/lib/components/Grid'
import Text from '@instructure/ui-core/lib/components/Text'

export default class Compare extends Component {
  render() {
    const {memberA, memberB} = this.props

    if (memberA && memberB) {
      return (
        <Container as="div">
          <Grid>
            <GridRow>
              <GridCol textAlign="center">
                <div>
                  <Button onClick={() => {this.props.onSelect(memberA)}}>{memberA.value}</Button>
                </div>

                <div>
                  <Button onClick={() => {this.props.onRemove(memberA)}}>Remove</Button>
                </div>
              </GridCol>

              <GridCol textAlign="center">
                <div>
                  <Button onClick={() => {this.props.onSelect(memberB)}}>{memberB.value}</Button>
                </div>

                <div>
                  <Button onClick={() => {this.props.onRemove(memberB)}}>Remove</Button>
                </div>
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
