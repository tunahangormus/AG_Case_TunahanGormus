import { gsap } from "gsap";
import { IScene } from "../Interface/IScene";
import CardStackModel from "./CardStackModel";
import CardStackView from "./CardStackView";
import * as PIXI from "pixi.js";

export default class CardStackController {
    private model: CardStackModel;
    private view: CardStackView;
    private active: boolean = false;
    private currentCard: number = 0;
    private currentStack: PIXI.Sprite[] = [];
    private otherStack: PIXI.Sprite[] = [];
    private currentStackId: number = 0;

    constructor(model: CardStackModel, view: CardStackView) {
        this.model = model;
        this.view = view;
        this.model.initiateCards();
    }

    init(): void {
        const stack1 = this.model.getStack1();
        const stack2 = this.model.getStack2();
        this.model.emptyStack(stack1);
        this.model.emptyStack(stack2);
        this.currentStack = stack1;
        this.otherStack = stack2;
        this.model.addAllCardsToStack(this.currentStack, this.model.getCards());
        this.currentStackId = 0;
        this.view.renderCards(this.model.getCards());
        this.active = true;
        this.animateCards();
    }

    animateCards(): void {
        if (!this.active) return;
        this.updateCurrentStack();
        const card = this.currentStack[this.currentStack.length - 1];
        this.view.animateCard(card, this.currentStack.length, this.currentStackId);
        this.model.removeCardFromStack(this.currentStack, card);
        this.model.addCardToStack(this.otherStack, card);
        gsap.delayedCall(1, this.animateCards.bind(this));
    }

    updateCurrentStack(): void {
        if (this.currentStack.length === 0) {
            this.currentStackId++;
            if (this.currentStackId === 2) {
                this.currentStackId = 0;
            }
            if (this.currentStackId === 0) {
                this.currentStack = this.model.getStack1();
                this.otherStack = this.model.getStack2();
            } else {
                this.currentStack = this.model.getStack2();
                this.otherStack = this.model.getStack1();
            }
        }
    }

    destroy(): void {
        this.active = false;
        this.model.destroy();
        this.view.destroy();
    }
}
