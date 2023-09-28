import { gsap } from "gsap";
import * as PIXI from "pixi.js";

export default class FireParticleView {
    private stage: PIXI.Container;
    private container: PIXI.Container;
    private activeFlames: PIXI.Graphics[] = [];
    private stackFlames: PIXI.Graphics[] = [];
    private currentFlameCount: number = 0;
    private active: boolean = true;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
        this.container = new PIXI.Container();
        this.container.sortableChildren = true;
        this.createFlames();
    }

    public init(): void {
        this.stage.addChild(this.container);
        this.active = true;

        for (let i = 0; i < 10; i++) {
            gsap.delayedCall(i * 0.1, () => {
                const flame = this.getFlame();
                this.enableFlame(flame);
            });
        }
    }

    private createFlames(): void {
        for (let i = 0; i < 10; i++) {
            const flame = new PIXI.Graphics();
            let colors = [0xe23b00, 0xfe8200];
            flame.beginFill(colors[Math.floor(Math.random() * colors.length)]);
            flame.drawEllipse(0, 0, 50, 40);
            flame.endFill();
            flame.blendMode = PIXI.BLEND_MODES.ADD;
            flame.alpha = 0;
            this.stackFlames.push(flame);
            this.container.addChild(flame);
        }
    }

    private getFlame(): PIXI.Graphics {
        if (this.stackFlames.length === 0) return new PIXI.Graphics();
        return this.stackFlames.pop() as PIXI.Graphics;
    }

    private enableFlame(flame: PIXI.Graphics): void {
        flame.x = 0;
        flame.y = 0;
        flame.scale.set(0);
        flame.alpha = 1;
        this.currentFlameCount++;
        flame.zIndex = -this.currentFlameCount;
        gsap.to(flame.scale, {
            duration: 0.15,
            x: 1,
            y: 1,
            ease: "sine.out",
            onComplete: () => {
                this.activeFlames.push(flame);
            },
        });
    }

    private disableFlames(): void {
        this.activeFlames.forEach((flame) => {
            flame.alpha = 0;
            this.stackFlames.push(flame);
        });
        this.activeFlames = [];
    }

    update(delta: number): void {
        if (!this.active) return;
        for (const flame of this.activeFlames) {
            if (flame.alpha <= 0) continue;

            flame.x -= (Math.random() * 6 - 3) * delta;
            flame.y -= (1.5 + Math.random() * 3) * delta;
            flame.scale.x -= (Math.random() * 0.025 + 0.025) * delta;
            flame.scale.y += Math.random() * 0.075 * delta;
            flame.alpha -= 0.04 * delta;

            if (flame.alpha <= 0) {
                this.activeFlames.splice(this.activeFlames.indexOf(flame), 1);
                this.stackFlames.push(flame);
                const newFlame = this.getFlame();
                this.enableFlame(newFlame);
            }
        }
    }

    destroy(): void {
        this.active = false;
        this.disableFlames();
        this.stage.removeChild(this.container);
    }

    resize(width: number, height: number): void {
        this.container.x = width / 2;
        this.container.y = height / 2;
    }
}
