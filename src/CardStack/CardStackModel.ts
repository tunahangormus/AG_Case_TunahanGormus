import { gsap } from "gsap";
import * as PIXI from "pixi.js";

export default class CardStackModel {
    private cardAssetCount: number = 48;
    private totalCardCount: number = 144;
    private cards: PIXI.Sprite[] = [];
    private stack1: PIXI.Sprite[] = [];
    private stack2: PIXI.Sprite[] = [];

    constructor() {}

    public initiateCards(): void {
        for (let i = 0; i < this.totalCardCount; i++) {
            let card = PIXI.Sprite.from(`card${(i % this.cardAssetCount).toString()}`);
            card.anchor.set(0.5);
            this.cards.push(card);
        }
    }

    public addCardToStack(stack: PIXI.Sprite[], card: PIXI.Sprite): void {
        stack.push(card);
    }

    public addAllCardsToStack(stack: PIXI.Sprite[], cards: PIXI.Sprite[]): void {
        cards.forEach((card) => {
            stack.push(card);
        });
    }

    public removeCardFromStack(stack: PIXI.Sprite[], card: PIXI.Sprite): void {
        stack.splice(stack.indexOf(card), 1);
    }

    public emptyStack(stack: PIXI.Sprite[]): void {
        stack.splice(0, stack.length);
    }

    public destroy(): void {
        gsap.killTweensOf(this.cards);
    }

    public getCards(): PIXI.Sprite[] {
        return this.cards;
    }

    public getStack1(): PIXI.Sprite[] {
        return this.stack1;
    }

    public getStack2(): PIXI.Sprite[] {
        return this.stack2;
    }

    public getTotalCardCount(): number {
        return this.totalCardCount;
    }
}
