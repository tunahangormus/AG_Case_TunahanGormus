import * as PIXI from "pixi.js";
import { RandomConfig } from "./RandomTextModel";
import { gsap } from "gsap";

export default class RandomTextView {
    private stage: PIXI.Container;
    private container: PIXI.Container;
    private lastX: number = 0;
    private lastWidth: number = 0;
    private lastHeight: number = 0;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.container = new PIXI.Container();
    }

    public init(): void {
        this.stage.addChild(this.container);
    }

    public renderMixedObjects(config: RandomConfig[]): void {
        this.container.removeChildren();
        this.lastX = 0;
        config.forEach((element) => {
            if (element.type === "text") {
                const text = new PIXI.Text(element.text || "", { fontSize: element.fontSize });
                text.anchor.set(0.5);
                text.x = this.lastX + text.width / 2;
                this.lastX = text.x + text.width / 2;
                this.container.addChild(text);
            } else if (element.type === "image") {
                const imageUrl: string = element.imageUrl ?? "";
                const image = PIXI.Sprite.from(imageUrl);
                image.anchor.set(0.5);
                image.scale.set(element.fontSize / 100);
                image.x = this.lastX + image.width / 2;
                this.lastX = image.x + image.width / 2;
                this.container.addChild(image);
            }
        });
        this.resize(this.lastWidth, this.lastHeight);
    }

    resize(width: number, height: number): void {
        this.lastWidth = width;
        this.lastHeight = height;
        this.container.calculateBounds();
        this.container.pivot.x = this.container.width / 2;
        this.container.pivot.y = this.container.height / 2;
        this.container.x = width / 2;
        this.container.y = height / 2;
    }

    destroy(): void {
        this.stage.removeChild(this.container);
    }
}
