class Plane extends Behavior
{
    constructor(speed) 
    {
        super();
        this.speed = speed;
    }

    StartPlane(velocityX, velocityY)
    {
        let frameY = 1
        if (velocityX === 1)
            frameY = 2;
        else if (velocityY === -1)
            frameY = 3;
        else if (velocityY === 1)
            frameY = 4;

        this.gameobject.sprite.frame = [5, frameY];
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    Update()
    {
        this.gameobject.Move(this.velocityX * this.speed, this.velocityY * this.speed);
    }

    OnCollide(gameobject)
    {
        if (!gameobject)
            this.gameobject.Destroy();
    }
}