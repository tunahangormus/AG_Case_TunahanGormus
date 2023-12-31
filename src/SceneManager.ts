import * as PIXI from "pixi.js";
import { IScene } from "./Interface/IScene";
import CardStack from "./CardStack/CardStack";
import { gsap } from "gsap";
import RandomText from "./RandomText/RandomText";
import FireParticle from "./FireParticle/FireParticle";
import ChangeSceneButton from "./UI/ChangeSceneButton";

export default class SceneManager {
    private scenes: IScene[] = [];
    private currentScene: IScene | null;
    private currentSceneID: number = -1;
    private stage: PIXI.Container;
    private lastWidth: number = 0;
    private lastHeight: number = 0;
    private changeSceneButton: ChangeSceneButton;

    constructor(stage: PIXI.Container) {
        this.scenes = [new CardStack(stage), new RandomText(stage), new FireParticle(stage)];
        this.stage = stage;
        this.currentScene = null;
        this.loadNextScene();
        this.changeSceneButton = new ChangeSceneButton(this.stage);
        this.changeSceneButton.buttonClick(this.loadNextScene.bind(this));
    }

    loadNextScene(): void {
        if (this.currentScene != null) {
            this.currentScene.destroy();
        }
        this.currentSceneID++;
        if (this.currentSceneID >= this.scenes.length) {
            this.currentSceneID = 0;
        }
        this.currentScene = this.scenes[this.currentSceneID];

        gsap.delayedCall(0.5, () => {
            this.currentScene?.init();
            this.resize(this.lastWidth, this.lastHeight);
        });
    }

    update(delta: number): void {
        if (this.currentScene != null) {
            this.currentScene.update(delta);
        }
    }

    resize(width: number, height: number): void {
        this.lastWidth = width;
        this.lastHeight = height;
        if (this.currentScene != null) {
            this.currentScene.resize(width, height);
        }

        this.changeSceneButton.resize(width, height);
    }
}
