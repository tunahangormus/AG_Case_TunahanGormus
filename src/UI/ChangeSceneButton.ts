import { gsap } from "gsap";
import * as PIXI from "pixi.js";

export default class ChangeSceneButton {
    private button: PIXI.Graphics = new PIXI.Graphics();
    private stage: PIXI.Container;
    private active: boolean = true;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.createButton();
        this.createButtonText();
    }

    createButton(): void {
        let button = new PIXI.Graphics();
        button.beginFill(0xffffff);
        button.drawRect(0, 0, 100, 50);
        button.endFill();
        button.interactive = true;
        button.buttonMode = true;
        this.button = button;
        this.stage.addChild(this.button);
    }

    buttonClick(callback: () => void): void {
        this.button.on("pointerdown", () => {
            if (!this.active) return;
            callback();
            this.animateButton();
            this.active = false;
            gsap.delayedCall(1, () => {
                this.active = true;
            });
        });
    }

    animateButton(): void {
        gsap.to(this.button.scale, {
            duration: 0.15,
            x: 0.9,
            y: 0.9,
            yoyo: true,
            repeat: 1,
        });
    }

    createButtonText(): void {
        let text = new PIXI.Text("➡️", { fill: 0x000000, fontSize: 36 });
        text.anchor.set(0.5);
        text.position.set(50, 25);
        this.button.addChild(text);
    }

    resize(width: number, height: number): void {
        this.button.position.set(width - 150, height - 100);
    }
}
