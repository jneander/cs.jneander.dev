import {P5ClientViewAdapter, P5ControlledClientView} from '../p5-utils'

import styles from './styles.module.css'

export interface CreatureCollectionViewProps {
  adapter: P5ClientViewAdapter
}

export function CreatureCollectionView(props: CreatureCollectionViewProps) {
  const {adapter} = props

  return (
    <P5ControlledClientView
      className={styles.Container}
      clientViewAdapter={adapter}
    />
  )
}