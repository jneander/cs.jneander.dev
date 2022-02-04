import type {AppController} from '../app-controller'
import type {P5ClientViewAdapter, P5Wrapper} from '../p5-utils'
import type {AppStore} from '../types'
import {CreatureGridP5UI} from './creature-grid-p5-ui'
import type {CreatureAndGridIndex} from './types'

export interface CreatureGridAdapterConfig {
  appController: AppController
  appStore: AppStore
  getCreatureAndGridIndexFn: (index: number) => CreatureAndGridIndex
  showsPopupSimulation: () => boolean
}

export class CreatureGridAdapter implements P5ClientViewAdapter {
  private config: CreatureGridAdapterConfig

  private creatureGridP5Ui: CreatureGridP5UI | null

  constructor(config: CreatureGridAdapterConfig) {
    this.config = config

    this.creatureGridP5Ui = null
  }

  initialize(p5Wrapper: P5Wrapper): void {
    this.creatureGridP5Ui = new CreatureGridP5UI({
      appController: this.config.appController,
      appStore: this.config.appStore,
      getCreatureAndGridIndexFn: this.config.getCreatureAndGridIndexFn,
      gridStartX: 40,
      gridStartY: 42,
      p5Wrapper,
      showsPopupSimulation: this.config.showsPopupSimulation
    })

    this.creatureGridP5Ui.initialize()
  }

  deinitialize(): void {
    this.creatureGridP5Ui = null
  }

  draw(): void {
    this.creatureGridP5Ui?.draw()
  }

  onMouseReleased() {
    this.creatureGridP5Ui?.onMouseReleased()
  }
}