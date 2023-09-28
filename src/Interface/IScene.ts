export interface IScene {
    init(): void;
    destroy(): void;
    update(delta: number): void;
    resize(width: number, height: number): void;
}
