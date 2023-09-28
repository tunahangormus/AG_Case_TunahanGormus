import { Application, Loader, Texture, AnimatedSprite } from "pixi.js";
import "./style.css";
import * as PIXI from "pixi.js";
import PixiPlugin from "gsap/PixiPlugin";
import gsap from "gsap";
import SceneManager from "./SceneManager";
import Stats from "stats.js";

const gameWidth = 800;
const gameHeight = 800;

const app = new Application({
    // backgroundColor: 0x19f3a5,
    backgroundColor: 0x000000,
    backgroundAlpha: 0,
    width: gameWidth,
    height: gameHeight,
});

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);
    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    app.stage.sortableChildren = true;

    const ticker = PIXI.Ticker.shared;

    const sceneManager = new SceneManager(app.stage);
    ticker.add((delta) => {
        stats.begin();
        sceneManager.update(delta);
        stats.end();
    });
    ticker.start();

    const resize = () => {
        const iw = document.body.clientWidth;
        const ih = document.body.clientHeight;

        sceneManager.resize(iw, ih);
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
        loader.add("cardAtlas", "./assets/cardAtlas.json");
        loader.add("genericAtlas", "./assets/genericAtlas.json");

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}
