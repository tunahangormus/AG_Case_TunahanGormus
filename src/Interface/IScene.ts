export interface IScene {
    init(): void;
    destroy(): void;
    update(): void;
    resize(width: number, height: number): void;
}
