import {useEffect, useMemo} from 'react'

import {useStore} from '../../../shared/state'
import {ChessBoard, ExampleControls, Metrics} from '../../shared'
import {Controller} from '../controller'
import {Configuration} from './configuration'

export function KnightCovering() {
  const controller = useMemo(() => {
    return new Controller()
  }, [])

  const state = useStore(controller.store)

  useEffect(() => {
    controller.initialize()
  }, [controller])

  function handleBoardSizeChange(size: number) {
    controller.setBoardSize(size)
  }

  function handlePositionChange(position: number) {
    controller.setPlaybackPosition(position)
  }

  return (
    <div className="flow">
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

      <Configuration
        boardSize={controller.boardSize}
        disabled={state.isRunning}
        onBoardSizeChange={handleBoardSizeChange}
      />

      <Metrics iteration={state.current ? state.current.iteration : 0} />

      <div>
        <ChessBoard positions={state.current?.chromosome?.genes} size={controller.boardSize} />
      </div>
    </div>
  )
}
