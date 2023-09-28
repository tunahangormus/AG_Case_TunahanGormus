export const MAP_COLOR_1: number = 0xcccccc;
export const MAP_COLOR_2: number = 0xffffff;

export const BLOCK_WIDTH: number = 35;
export const BLOCK_HEIGHT: number = 35;
export const BLOCKS_IN_ROW: number = 50;
export const BLOCKS_IN_COL: number = 50;

export const HAY_COUNT: number = 25;
export const WALL_COUNT: number = 50;

export const TANK_WIDTH: number = 35;
export const TANK_HEIGHT: number = 35;
export const TANK_MAX_SPEED: number = 3;
export const TANK_MAX_ROTATION_SPEED: number = Math.PI / 90;

export const BULLET_RADIUS: number = 5;
export const BULLET_SPEED: number = 8;

export const TANKS_DATA: { color: number; bulletCount: number; damage: number }[] = [
    { color: 0xff0000, bulletCount: 2, damage: 10 },
    { color: 0x0000ff, bulletCount: 3, damage: 20 },
    { color: 0x00ff00, bulletCount: 1, damage: 25 },
];
