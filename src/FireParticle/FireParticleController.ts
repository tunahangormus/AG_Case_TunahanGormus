import FireParticleView from "./FireParticleView";

export default class FireParticleController {
    private view: FireParticleView;

    constructor(view: FireParticleView) {
        this.view = view;
    }

    init(): void {
        this.view.init();
    }

    destroy(): void {
        this.view.destroy();
    }

    update(delta: number): void {
        this.view.update(delta);
    }
}
