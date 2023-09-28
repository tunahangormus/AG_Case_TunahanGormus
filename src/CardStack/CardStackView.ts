import { gsap } from "gsap";
import * as PIXI from "pixi.js";
import CardStackModel from "./CardStackModel";

export default class CardStackView {
    private container: PIXI.Container;
    private stage: PIXI.Container;
    private model: CardStackModel;
    private containerBounds = new PIXI.Rectangle();
    private stack1Text: PIXI.Text;
    private stack2Text: PIXI.Text;

    constructor(stage: PIXI.Container, model: CardStackModel) {
        this.stage = stage;
        this.model = model;
        this.container = new PIXI.Container();
        this.stack1Text = new PIXI.Text("Stack Count: ", { fill: 0xffffff, fontSize: 36 });
        this.stack2Text = new PIXI.Text("Stack Count: ", { fill: 0xffffff, fontSize: 36 });
    }

    public renderCards(cards: PIXI.Sprite[]): void {
        cards.forEach((card) => {
            this.container.addChild(card);
        });
        this.container.sortableChildren = true;
    }

    public addStackText(): void {
        this.stack1Text.anchor.set(0.5);
        this.stack1Text.position.set(200, 50);
        this.stack2Text.anchor.set(0.5);
        this.stack2Text.position.set(200, 750);
        this.container.addChild(this.stack1Text);
        this.container.addChild(this.stack2Text);
    }

    public updateStackText(stack1Count: number, stack2Count: number): void {
        this.stack1Text.text = `Stack Count: ${stack1Count}`;
        this.stack2Text.text = `Stack Count: ${stack2Count}`;
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
        this.updateStackText(this.model.getStack1().length, this.model.getStack2().length);
        this.stage.addChild(this.container);
    }

    public animateCard(card: PIXI.Sprite, cardXIndex: number, cardYIndex: number): void {
        const newY = cardYIndex === 0 ? 600 : 200;
        const newX = cardXIndex * 2;
        card.rotation = 0;
        gsap.delayedCall(0.5, () => {
            card.zIndex = -cardXIndex;
        });

        gsap.to(card, {
            duration: 2,
            x: newX,
            y: newY,
            rotation: Math.PI,
            onComplete: () => {
                this.updateStackText(this.model.getStack1().length, this.model.getStack2().length);
            },
        });
    }

    public resize(width: number, height: number): void {
        this.container.scale.set(Math.min((width * 0.7) / this.containerBounds.width, (height * 0.7) / 800));
        this.container.pivot.x = this.containerBounds.width / 2;
        this.container.pivot.y = this.containerBounds.height * 1.15;
        this.container.x = width / 2;
        this.container.y = height / 2;
    }

    public destroy(): void {
        this.stage.removeChild(this.container);
    }
}
