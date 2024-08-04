class Laser extends Behavior
{
    velocityX = 0;
    velocityY = 0;
    sender = null;
    list = [];

    constructor(damage, time)
    {
        super();
        this.damage = damage;
        this.time = time;
    }

    Hit(gameobject)
    {
        let temp = gameobject.GetBehavior(Damageble);
        if (temp)
            temp.TakeDamage(this.damage);
    }

    StartLaser(config)
    {
        this.sender = config.sender;
        this.velocityX = config.velocityX;
        this.velocityY = config.velocityY;

        let temp = 0;
        if (this.velocityX !== 0)
        {
            temp = this.velocityX === 1 ? MAP_WIDTH - this.sender.x + TILE_WIDTH : this.sender.x;
            this.gameobject.sprite.width = temp;
            this.gameobject.hitboxWidth = temp;
            this.gameobject.GoTo(this.velocityX === 1 ? this.sender.x + TILE_WIDTH : 0, this.sender.y);
            this.gameobject.sprite.frame = [3, 3];
        }
        else
        {
            temp = this.velocityY === 1 ? MAP_HEIGHT - this.sender.y + TILE_HEIGHT : this.sender.y;
            this.gameobject.sprite.height = temp;
            this.gameobject.hitboxHeight = temp;
            this.gameobject.GoTo(this.sender.x, this.velocityY === 1 ? this.sender.y + TILE_HEIGHT : 0);
        }

        let gameobjects = this.gameobject.gameInstance.gameobjects;
        for (let i = 0; i < gameobjects.length; i++) 
        {
            let gameobj = gameobjects[i];
            if (gameobj.id === this.gameobject.id || gameobj.id == this.sender.id || gameobj.hitboxWidth === 0 || gameobj.hitboxHeight === 0)
                continue;

            if (this.velocityX !== 0)
            {
                if (Math.abs(gameobj.y - this.gameobject.y) < this.gameobject.hitboxHeight / 2 + gameobj.hitboxHeight / 2 && (this.velocityX === 1 ? gameobj.x > this.sender.x : gameobj.x < this.sender.x))
                    this.Hit(gameobj);
            }
            else if (Math.abs(gameobj.x - this.gameobject.x) < this.gameobject.hitboxWidth / 2 + gameobj.hitboxWidth / 2 && (this.velocityY === 1 ? gameobj.y > this.sender.y : gameobj.y < this.sender.y))
                this.Hit(gameobj);
        }

        this.gameobject.isTrigger = true;
        setTimeout(() => this.gameobject.Destroy(), this.time);
    }
}