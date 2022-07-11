class StarFieldSprite
{
    Reset(time, context)
    {
        let inMemoryCanvas = document.createElement('canvas');
        inMemoryCanvas.height = context.canvas.height;
        inMemoryCanvas.width = context.canvas.width;
        this.starfieldContext = inMemoryCanvas.getContext("2d");

        this.IsFinished = false;   
        this.startTime = time;
        this.starfieldContext.fillStyle = "black";
        this.starfieldContext.fillRect(0, 0, context.canvas.width, context.canvas.height);
        this.numStars = 0;
    }

    Animate(elapsedTime, context)
    {

        if (this.numStars < 1000)
        {
            for (let i = 0; i < 20; i++)
            {
                const x = Math.floor(Math.random() * context.canvas.width);
                const y = Math.floor(Math.random() * context.canvas.height);
                const randomColor = Math.floor(Math.random()*16777215).toString(16);

                this.starfieldContext.globalAlpha = Math.floor(Math.random() * 256);
                this.starfieldContext.fillStyle = "#" + randomColor;
                this.starfieldContext.fillRect(x, y, 1, 1);
                this.starfieldContext.globalAlpha = 1;
                this.numStars++;
            }
        }
        else
        {
            this.IsFinished = true;
        }
    }   

    Render(context, caption)
    {
        if (this.IsFinished = false)
        {
            caption.innerText = "Imagine, deep in space";
        }
        context.drawImage(this.starfieldContext.canvas, 0, 0);
    }
}

class RedGiantSprite
{
    STAR_COLOR = "#FF1901";
    STAR_RADIUS = 100;
    CORONA_RADIUS = 30;

    Reset(time, context)
    {
        this.startTime = time;
        this.IsFinished = false;  

        var inMemoryCanvas = document.createElement("canvas");
        inMemoryCanvas.width = this.STAR_RADIUS * 2;
        inMemoryCanvas.height = this.STAR_RADIUS * 2;
        this.starContext = inMemoryCanvas.getContext("2d");
        
        //draw the star
        this.starContext.fillStyle = this.STAR_COLOR;
        this.starContext.strokeStyle = this.STAR_COLOR;

        //draw the corona
        this.starContext.beginPath();
        let coreRadius = this.STAR_RADIUS - this.CORONA_RADIUS;
        this.starContext.arc(this.STAR_RADIUS, this.STAR_RADIUS, coreRadius, 0, 2 * Math.PI);
        this.starContext.fill(); 

        for (let r = coreRadius; r < this.STAR_RADIUS; r++)
        {
            //this.starContext.strokeStyle = "rgba(255,255,255,0.5)";
            this.starContext.globalAlpha = 1 - ((r - coreRadius) * 0.05);
            this.starContext.beginPath();
            this.starContext.arc(this.STAR_RADIUS, this.STAR_RADIUS, r, 0, 2 * Math.PI);
            this.starContext.stroke();
            console.log(this.starContext.globalAlpha);
        }

        this.starContext.globalAlpha = 1;
    }

    Animate(elapsedTime, context)
    {
        if (elapsedTime > 3_000)
        {
            this.IsActive = true;
        }
    }

    Render(context, caption)
    {
        if (this.IsActive === true)
        {
            context.drawImage(this.starContext.canvas, context.canvas.width * 0.5 - this.STAR_RADIUS, context.canvas.height * 0.5 - this.STAR_RADIUS);
            caption.innerText = "there's a red supergiant";
        }
    }
}

export default [
    new StarFieldSprite(),
    new RedGiantSprite()
];