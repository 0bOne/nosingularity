import StarfieldSprites from "./sprites/starfield.js";

export default class Application
{
    sprites;
    isFirstFrame;

    Begin()
    {
        let canvas1 = document.getElementById('canvas1');
        this.frontBuffer = canvas1.getContext("2d");
        this.caption = document.getElementById("caption1");

        let inMemoryCanvas = document.createElement('canvas');
        inMemoryCanvas.height = canvas1.height;
        inMemoryCanvas.width = canvas1.width;
        this.backBuffer = inMemoryCanvas.getContext("2d");

        this.onAmimationBound = this.onAnimiation.bind(this);

        this.sprites = [...StarfieldSprites];

        this.isFirstFrame = true;
        window.requestAnimationFrame(this.onAmimationBound);

    }

    onAnimiation(time)
    {
        this.startTime = this.startTime || time;
        if (this.isFirstFrame === true)
        {
            for (let i = 0; i < this.sprites.length; i++)
            {
                this.sprites[i].Reset(time, this.backBuffer);
            }
            this.isFirstFrame = false;
        }

        const elapsedTime = time - this.startTime;

        let isFinished = false;
        for (let i = 0; i < this.sprites.length; i++)
        {
            this.sprites[i].Animate(elapsedTime, this.backBuffer);
            isFinished = isFinished && this.sprites[i].IsFinished;
        }

        if (isFinished === false)
        {
            for (let i = 0; i < this.sprites.length; i++)
            {
                this.sprites[i].Render(this.backBuffer, this.caption);   
            }
            this.frontBuffer.drawImage(this.backBuffer.canvas, 0, 0);
            window.requestAnimationFrame(this.onAmimationBound);
        }
        else
        {
            console.log("animation finished");
        }
    }

}

window.app = new Application();
window.app.Begin();
