import * as PIXI from "pixi.js";
import { IScene } from "../Interface/IScene";
import RandomTextModel from "./RandomTextModel";
import RandomTextView from "./RandomTextView";
import RandomTextController from "./RandomTextController";

export default class RandomText implements IScene {
    private model: RandomTextModel;
    private view: RandomTextView;
    private controller: RandomTextController;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.model = new RandomTextModel();
        this.view = new RandomTextView(this.stage);
        this.controller = new RandomTextController(this.model, this.view);
    }

    init(): void {
        this.controller.init();
    }

    destroy(): void {
        this.controller.destroy();
        this.view.destroy();
    }

    update(): void {}

    resize(width: number, height: number): void {
        this.view.resize(width, height);
    }
}
