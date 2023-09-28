import * as PIXI from "pixi.js";
import { IScene } from "./Interface/IScene";
import { SCENES } from "./constants";

export default class SceneManager {
    private scenes: IScene[] = [];
    private currentScene: IScene | null;
    private currentSceneID: number = 0;
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.scenes = SCENES;
        this.currentScene = null;
        this.loadNextScene();
    }

    loadNextScene() {
        if (this.currentScene != null) {
            this.currentScene.destroy();
        }
        this.currentSceneID++;
        if (this.currentSceneID >= this.scenes.length) {
            this.currentSceneID = 0;
        }
        this.currentScene = this.scenes[this.currentSceneID];
        this.currentScene.init();
    }

    update(delta: number) {
        if (this.currentScene != null) {
            this.currentScene.update();
        }
    }
}
