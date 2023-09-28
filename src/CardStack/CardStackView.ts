import { gsap } from "gsap";
import * as PIXI from "pixi.js";

export default class CardStackView {
    private container: PIXI.Container;
    private stage: PIXI.Container;
    private containerBounds = new PIXI.Rectangle();

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.container = new PIXI.Container();
    }

    public renderCards(cards: PIXI.Sprite[]): void {
        cards.forEach((card) => {
            this.container.addChild(card);
        });
        this.container.sortableChildren = true;
    }

    public init(cards: PIXI.Sprite[]): void {
        cards.forEach((card, index) => {
            card.zIndex = index;
            card.rotation = 0;
            card.position.set(index * 2, 200);
            card.anchor.set(0.5);
        });
        this.container.calculateBounds();
        this.containerBounds = this.container.getBounds();
        this.stage.addChild(this.container);
    }

    public animateCard(card: PIXI.Sprite, cardXIndex: number, cardYIndex: number): void {
        const newY = cardYIndex === 0 ? 600 : 200;
        const newX = cardXIndex * 2;
        gsap.delayedCall(0.5, () => {
            card.zIndex = -cardXIndex;
        });
        gsap.to(card, { duration: 1, x: newX, y: newY, rotation: Math.PI });
    }

    public resize(width: number, height: number): void {
        this.container.scale.set(Math.min((width * 0.8) / this.containerBounds.width, (height * 0.8) / 800));
        this.container.x = width / 2 - this.containerBounds.width * this.container.scale.x * 0.4;
        this.container.y = height / 2 - this.containerBounds.height * this.container.scale.y * 2;
    }

    public destroy(): void {
        this.stage.removeChild(this.container);
    }
}
