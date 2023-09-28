import * as PIXI from "pixi.js";
import { IScene } from "./Interface/IScene";
import CardStack from "./CardStack/CardStack";
import { gsap } from "gsap";
import RandomText from "./RandomText/RandomText";

export default class SceneManager {
    private scenes: IScene[] = [];
    private currentScene: IScene | null;
    private currentSceneID: number = -1;
    private stage: PIXI.Container;
    private lastWidth: number = 0;
    private lastHeight: number = 0;

    constructor(stage: PIXI.Container) {
        this.scenes = [new CardStack(stage), new RandomText(stage)];
        this.stage = stage;
        this.currentScene = null;
        this.loadNextScene();

        document.addEventListener("keydown", this.onKeyDown.bind(this));
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            this.loadNextScene();
        }
    };

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
            this.currentScene.update();
        }
    }

    resize(width: number, height: number): void {
        this.lastWidth = width;
        this.lastHeight = height;
        if (this.currentScene != null) {
            this.currentScene.resize(width, height);
        }
    }
}
