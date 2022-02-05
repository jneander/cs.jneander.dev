import {CREATURE_COUNT} from '../constants'

export const CREATURE_GRID_TILE_WIDTH = 30
export const CREATURE_GRID_TILE_HEIGHT = 25
export const CREATURE_GRID_TILES_PER_ROW = 40
export const CREATURE_GRID_TILES_PER_COLUMN =
  CREATURE_COUNT / CREATURE_GRID_TILES_PER_ROW

export const CREATURE_GRID_OVERDRAW_MARGIN_X = CREATURE_GRID_TILE_WIDTH / 2
export const CREATURE_GRID_OVERDRAW_MARGIN_Y = Math.floor(
  CREATURE_GRID_TILE_HEIGHT / 2
)

export const GRID_AREA_WIDTH =
  CREATURE_GRID_TILE_WIDTH * CREATURE_GRID_TILES_PER_ROW
export const GRID_AREA_HEIGHT =
  CREATURE_GRID_TILE_HEIGHT * CREATURE_GRID_TILES_PER_COLUMN

export const VIEW_PADDING_START_X = 40
export const VIEW_PADDING_START_Y = 42
export const VIEW_PADDING_END_X = 40
export const VIEW_PADDING_END_Y = 53

export const CREATURE_COLLECTION_VIEW_WIDTH =
  GRID_AREA_WIDTH + VIEW_PADDING_START_X + VIEW_PADDING_END_X // 1280
export const CREATURE_COLLECTION_VIEW_HEIGHT =
  GRID_AREA_HEIGHT + VIEW_PADDING_START_Y + VIEW_PADDING_END_Y // 720
