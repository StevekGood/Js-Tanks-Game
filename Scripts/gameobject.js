
class GameObject
{
    constructor(config, gameInstance)
    {
        this.id = GameObject.Id;
        GameObject.Id++;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.hitboxWidth = config.hitboxWidth || 0;
        this.hitboxHeight = config.hitboxHeight || 0;
        this.isTrigger = config.isTrigger || false;
        this.gameInstance = gameInstance;
        this.sprite = new Sprite({
            gameobject: this,
            src: config.src || "../Sprites/placeholder.png",
            frame: config.frame || [0, 0],
        })

        this.behavior = [];
        if (config.behavior)
            for (let i = 0; i < config.behavior.length; i++)
                this.behavior.push(new config.behavior[i].type(...config.behavior[i].args));

        for (let i = 0; i < this.behavior.length; i++)
            this.behavior[i].Initialize(this);
    }

    GoTo(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Move(x, y)
    {
        this.x += x;
        this.y += y;

        if (this.x < -TILE_WIDTH + this.hitboxWidth || this.x > MAP_WIDTH - this.hitboxWidth || this.y < -TILE_HEIGHT + this.hitboxHeight || this.y > MAP_HEIGHT - this.hitboxHeight)
        {
            this.x -= x;
            this.y -= y;
            this.OnCollide(null);
        }

        if (this.hitboxWidth === 0 || this.hitboxHeight === 0)
            return;

        let tempX, tempY, gameobj, distanceX, distanceY;
        for (let i = 0; i < this.gameInstance.gameobjects.length; i++) 
        {
            gameobj = this.gameInstance.gameobjects[i];

            if (gameobj.id === this.id || gameobj.hitboxWidth === 0 || gameobj.hitboxHeight === 0)
                continue;

            tempX = Math.abs(this.x - gameobj.x);
            tempY = Math.abs(this.y - gameobj.y);

            distanceX = this.hitboxWidth / 2 + gameobj.hitboxWidth / 2;
            distanceY = this.hitboxHeight / 2 + gameobj.hitboxHeight / 2;

            if (tempX < distanceX && tempY < distanceY)
            {
                if (!gameobj.isTrigger && !this.isTrigger)
                {
                    this.x -= x;
                    this.y -= y;
                }

                this.OnCollide(gameobj);
                gameobj.OnCollide(this);
                return;
            }
        }
    }

    GetBehavior(type)
    {
        for (let i = 0; i < this.behavior.length; i++) 
            if (this.behavior[i] instanceof type)
                return this.behavior[i];

        return undefined;
    }

    Destroy()
    {
        this.gameInstance.Destroy(this);
    }

    OnReset()
    {
        for (let i = 0; i < this.behavior.length; i++) 
            this.behavior[i].OnReset();
    }

    OnCollide(gameobject)
    {
        for (let i = 0; i < this.behavior.length; i++) 
            this.behavior[i].OnCollide(gameobject);
    }

    AddBehavior(newBehavior)
    {
        for (let i = 0; i < this.behavior.length; i++) 
            this.behavior[i].OnBehaviorAdded(newBehavior);

        this.behavior.push(newBehavior);
        newBehavior.Initialize(this);
    }

    Update(ctx)
    {
        for (let i = 0; i < this.behavior.length; i++)
            this.behavior[i].Update();

        this.sprite.Draw(ctx);
    }
}

GameObject.Id = 0;