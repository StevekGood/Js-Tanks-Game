const colorize = (image, color) => {
    const imageSize = image.width;
  
    const offscreen = new OffscreenCanvas(imageSize, imageSize);
    const ctx = offscreen.getContext("2d");
  
    ctx.drawImage(image, 0, 0);
  
    const imageData = ctx.getImageData(0, 0, imageSize, imageSize);
  
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] *= color[0];
      imageData.data[i + 1] *= color[1];
      imageData.data[i + 2] *= color[2];
    }
  
    ctx.putImageData(imageData, 0, 0);
  
    return offscreen;
}

class Sprite
{
    constructor(config)
    {
        this.gameobject = config.gameobject;
        this.src = config.src;
        this.frame = config.frame;
        this.width = TILE_WIDTH;
        this.height = TILE_HEIGHT;

        this.image = new Image();
        this.image.src = this.src;
        this.image.onload = () => {
            this.loaded = true;
            if (this.color)
                this.image = colorize(this.image, this.color);
        }

    }

    Colorize(color)
    {
        if (!this.loaded)
        {
            this.color = color;
            return;
        }

        this.image = colorize(this.image, color);
    }

    Draw(ctx)
    {
        this.loaded && ctx.drawImage(
            this.image,
            this.frame[0] * TILE_WIDTH, this.frame[1] * TILE_HEIGHT,
            TILE_WIDTH, TILE_HEIGHT,
            this.gameobject.x,
            this.gameobject.y,
            this.width, this.height
        )
    }
}