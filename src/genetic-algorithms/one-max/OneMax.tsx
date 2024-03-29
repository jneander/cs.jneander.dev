import {useEffect, useMemo} from 'react'

import {useStore} from '../../shared/state'
import {ChromosomeTable, ExampleControls} from '../shared'
import Controller from './Controller'

import styles from './styles.module.css'

export default function OneMax() {
  const controller = useMemo(() => {
    return new Controller()
  }, [])

  const state = useStore(controller.store)

  useEffect(() => {
    controller.initialize()
  }, [controller])

  function handlePositionChange(position: number) {
    controller.setPlaybackPosition(position)
  }

  return (
    <div className={styles.Container}>
      <ExampleControls
        maxPropagationSpeed={state.maxPropagationSpeed}
        onIterate={controller.iterate}
        onPause={controller.stop}
        onPositionChange={handlePositionChange}
        onRefresh={controller.randomizeTarget}
        onSetMaxPropagationSpeed={controller.setMaxPropagationSpeed}
        onSetPropagationSpeed={controller.setPropagationSpeed}
        onSetRecordAllIterations={controller.setRecordAllIterations}
        onStart={controller.start}
        playing={state.isRunning}
        propagationSpeed={state.propagationSpeed}
        rangePosition={state.playbackPosition}
        rangePositionCount={state.iterationCount}
        recordAllIterations={state.allIterations}
      />

      <div>
        <ChromosomeTable
          best={state.best}
          current={state.current}
          first={state.first}
          formatGenes={genes => genes.join('')}
          target={state.target}
        />
      </div>
    </div>
  )
}
