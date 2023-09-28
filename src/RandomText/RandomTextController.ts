import { gsap } from "gsap";
import RandomTextModel from "./RandomTextModel";
import RandomTextView from "./RandomTextView";

export default class RandomTextController {
    private model: RandomTextModel;
    private view: RandomTextView;
    private delayedCall: gsap.core.Tween | null = null;

    constructor(model: RandomTextModel, view: RandomTextView) {
        this.model = model;
        this.view = view;
    }

    init(): void {
        this.view.init();
        this.createRandomText();
    }

    createRandomText(): void {
        const config = this.model.generateRandomConfiguration();
        this.view.renderMixedObjects(config);

        this.delayedCall = gsap.delayedCall(2, () => {
            this.createRandomText();
        });
    }

    destroy(): void {
        this.delayedCall?.kill();
    }
}
