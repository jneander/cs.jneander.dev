import React, {Component} from 'react'

function getLocationFromEvent(event, self) {
  const columnIndex = [].findIndex.call(self.tableRow.children, header => header.contains(event.target))

  if (columnIndex === -1) {
    return null // this should never occur
  }

  return {
    columnId: self.props.columns[columnIndex].id,
    region: 'header',
    rowId: null
  }
}

export default class HeaderRow extends Component {
  constructor(props) {
    super(props)

    this.bindTableRow = ref => {
      this.tableRow = ref
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    const location = getLocationFromEvent(event, this)
    if (location) {
      this.props.onClick(event, location)
    }
  }

  render() {
    if (!this.props.navigable) {
      return (
        <tr>
          {this.props.columns.map(column =>
            this.props.renderColumnHeader({column, key: column.id})
          )}
        </tr>
      )
    }

    const {activeLocation, bindActiveElement} = this.props

    const headerIsActive = activeLocation.region === 'header'
    const isActiveLocation = columnId => headerIsActive && columnId === activeLocation.columnId
    const tabIndexFor = columnId => (isActiveLocation(columnId) ? '0' : '-1')
    const refFor = columnId => (isActiveLocation(columnId) ? bindActiveElement : undefined)

    return (
      <tr onClick={this.props.onClick && this.handleClick} ref={this.bindTableRow}>
        {this.props.columns.map(column =>
          this.props.renderColumnHeader({
            column,
            focusableRef: refFor(column.id),
            key: column.id,
            tabIndex: tabIndexFor(column.id)
          })
        )}
      </tr>
    )
  }
}
