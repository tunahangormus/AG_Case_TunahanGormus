export interface RandomConfig {
    type: "text" | "image";
    text?: string;
    imageUrl?: string;
    fontSize: number;
}

export default class RandomTextModel {
    private totalImageCount: number = 18;
    private minFontSize: number = 16;
    private maxFontSize: number = 64;

    constructor() {}

    generateRandomText(): string {
        const randomText = Math.random().toString(36).substring(2, 3);
        return randomText;
    }

    generateRandomImage(): string {
        const randomImageNumber = Math.floor(Math.random() * this.totalImageCount);
        return "generic" + randomImageNumber;
    }

    generateRandomFontSize(): number {
        return Math.floor(Math.random() * (this.maxFontSize - this.minFontSize + 1) + this.minFontSize);
    }

    generateRandomConfiguration(): RandomConfig[] {
        const numObjects = Math.floor(Math.random() * 5) + 5;
        let configuration: RandomConfig[] = [];
        for (let i = 0; i < numObjects; i++) {
            if (Math.random() < 0.5) {
                configuration[i] = {
                    type: "text",
                    text: this.generateRandomText(),
                    fontSize: this.generateRandomFontSize(),
                };
            } else {
                configuration[i] = {
                    type: "image",
                    imageUrl: this.generateRandomImage(),
                    fontSize: this.generateRandomFontSize(),
                };
            }
        }

        return configuration;
    }
}
