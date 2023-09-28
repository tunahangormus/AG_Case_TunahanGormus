import * as PIXI from "pixi.js";
import { IScene } from "../Interface/IScene";
import FireParticleView from "./FireParticleView";
import FireParticleController from "./FireParticleController";

export default class FireParticle implements IScene {
    private view: FireParticleView;
    private controller: FireParticleController;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.view = new FireParticleView(this.stage);
        this.controller = new FireParticleController(this.view);
    }

    init(): void {
        this.controller.init();
    }

    destroy(): void {
        this.controller.destroy();
    }

    update(delta: number): void {
        this.controller.update(delta);
    }

    resize(width: number, height: number): void {
        this.view.resize(width, height);
    }
}
