import type p5 from 'p5'
import type {Color} from 'p5'

import {getSpeciesColorHSB} from '../creatures'
import type {RowAndColumn} from './types'

export function gridIndexToRowAndColumn(gridIndex: number, tilesPerRow: number): RowAndColumn {
  const columnIndex = gridIndex % tilesPerRow
  const rowIndex = Math.floor(gridIndex / tilesPerRow)

  return {columnIndex, rowIndex}
}

export function rowAndColumnToGridIndex(rowAndColumn: RowAndColumn, tilesPerRow: number): number {
  const {columnIndex, rowIndex} = rowAndColumn

  return rowIndex * tilesPerRow + columnIndex
}

export function getSpeciesColor(p5: p5, speciesId: number, adjust: boolean): Color {
  const [h, s, b] = getSpeciesColorHSB(speciesId, adjust)

  p5.colorMode(p5.HSB, 1.0)
  return p5.color(h, s, b)
}
