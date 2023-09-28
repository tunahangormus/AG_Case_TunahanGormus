import * as PIXI from "pixi.js";
import { IScene } from "../Interface/IScene";
import CardStackController from "./CardStackController";
import CardStackModel from "./CardStackModel";
import CardStackView from "./CardStackView";

export default class CardStack implements IScene {
    private model: CardStackModel;
    private view: CardStackView;
    private controller: CardStackController;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.model = new CardStackModel();
        this.view = new CardStackView(this.stage, this.model);
        this.controller = new CardStackController(this.model, this.view);
    }

    init(): void {
        this.controller.init();
    }

    destroy(): void {
        this.controller.destroy();
    }

    update(): void {}

    resize(width: number, height: number): void {
        this.view.resize(width, height);
    }
}
