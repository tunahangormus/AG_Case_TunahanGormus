import { Application, Loader, Texture, AnimatedSprite } from "pixi.js";
import "./style.css";
import * as PIXI from "pixi.js";
import PixiPlugin from "gsap/PixiPlugin";
import gsap from "gsap";
import SceneManager from "./SceneManager";

const gameWidth = 800;
const gameHeight = 800;

const app = new Application({
    backgroundColor: 0x19f3a5,
    backgroundAlpha: 0,
    width: gameWidth,
    height: gameHeight,
});

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);
    app.stage.sortableChildren = true;

    const ticker = PIXI.Ticker.shared;

    const sceneManager = new SceneManager(app.stage);
    ticker.add(sceneManager.update.bind(sceneManager));
    ticker.start();

    const resize = () => {
        const iw = document.body.clientWidth;
        const ih = document.body.clientHeight;

        app.renderer.resize(iw, ih);
    };

    resize();
    setTimeout(resize, 10);
    window.addEventListener("resize", resize);
    app.stage.interactive = true;
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}
