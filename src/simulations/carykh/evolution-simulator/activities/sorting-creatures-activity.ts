import {
  ActivityId,
  CREATURE_COUNT,
  GenerationSimulationMode,
  SCALE_TO_FIX_BUG
} from '../constants'
import {CreatureDrawer} from '../creature-drawer'
import {Widget, WidgetConfig} from '../views'
import {Activity, ActivityConfig} from './shared'

export class SortingCreaturesActivity extends Activity {
  private creatureDrawer: CreatureDrawer

  private skipButton: SortingCreaturesSkipButton

  private activityTimer: number

  constructor(config: ActivityConfig) {
    super(config)

    this.creatureDrawer = new CreatureDrawer({appView: this.appView})

    this.skipButton = new SortingCreaturesSkipButton({
      appController: this.appController,
      appState: this.appState,
      appView: this.appView,

      onClick: () => {
        this.activityTimer = 100000
      }
    })

    this.activityTimer = 0
  }

  draw(): void {
    const {appState, appView} = this
    const {canvas} = appView

    canvas.background(220, 253, 102)
    canvas.push()
    canvas.scale(10.0 / SCALE_TO_FIX_BUG)

    const transition =
      0.5 - 0.5 * Math.cos(Math.min(this.activityTimer / 60, Math.PI))

    for (let i1 = 0; i1 < CREATURE_COUNT; i1++) {
      const creature = appState.sortedCreatures[i1]
      const j2 = creature.id - appState.generationCount * CREATURE_COUNT - 1
      const x1 = j2 % 40
      const y1 = Math.floor(j2 / 40)
      const x2 = i1 % 40
      const y2 = Math.floor(i1 / 40) + 1
      const x3 = this.interpolate(x1, x2, transition)
      const y3 = this.interpolate(y1, y2, transition)

      this.creatureDrawer.drawCreature(
        creature,
        x3 * 3 + 5.5,
        y3 * 2.5 + 4,
        canvas
      )
    }

    canvas.pop()

    this.skipButton.draw()
    if (appState.generationSimulationMode === GenerationSimulationMode.Quick) {
      this.activityTimer += 10
    } else {
      this.activityTimer += 2
    }

    if (this.activityTimer > 60 * Math.PI) {
      this.appController.setActivityId(ActivityId.SortedCreatures)
    }
  }

  onMouseReleased(): void {
    if (this.skipButton.isUnderCursor()) {
      this.skipButton.onClick()
    }
  }

  private interpolate(a: number, b: number, offset: number): number {
    return a + (b - a) * offset
  }
}

interface SkipButtonConfig extends WidgetConfig {
  onClick(): void
}

class SortingCreaturesSkipButton extends Widget {
  onClick: () => void

  constructor(config: SkipButtonConfig) {
    super(config)

    this.onClick = config.onClick
  }

  draw(): void {
    const {canvas, font, height} = this.appView

    canvas.fill(0)
    canvas.rect(0, height - 40, 90, 40)
    canvas.fill(255)
    canvas.textAlign(canvas.CENTER)
    canvas.textFont(font, 32)
    canvas.text('SKIP', 45, height - 8)
  }

  isUnderCursor(): boolean {
    const {appView} = this
    return appView.rectIsUnderCursor(0, appView.height - 40, 90, 40)
  }
}