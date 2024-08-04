class C4Mine extends Behavior
{
    constructor(damage, time)
    {
        super();
        this.damage = damage;
        this.time = time;
    }

    StartC4(sender)
    {
        this.sender = sender;
        this.gameobject.GoTo(sender.x, sender.y);

        this.timeout = setTimeout(this.Boom.bind(this), this.time);
    }

    Boom()
    {
        this.timeout = null;
        const gameobjects = this.sender.gameInstance.gameobjects;
        let temp = null;
        for (let i = 0; i < gameobjects.length; i++) 
        {
            if (gameobjects[i].id === this.sender.id)
                continue;

            temp = gameobjects[i].GetBehavior(Damageble);
            if (temp && ((gameobjects[i].x - this.gameobject.x) ** 2 + (gameobjects[i].y - this.gameobject.y) ** 2 <= C4Mine.range))
                temp.TakeDamage(this.damage);
        }

        for (let i = 0; i < 4; i++)
        {
            for (let j = -i; j < i + 1; j++)
            {
                let temp2 = this.gameobject.gameInstance.Spawn(EXPLOSION);
                temp2.GoTo(this.gameobject.x + j * TILE_WIDTH, this.gameobject.y + ((3 - i) * TILE_HEIGHT));
                setTimeout(() => temp2.Destroy(), 250);
            }
        }

        for (let i = 0; i < 3; i++)
        {
            for (let j = -2 + i; j < 3 - i; j++)
            {
                let temp2 = this.gameobject.gameInstance.Spawn(EXPLOSION);
                temp2.GoTo(this.gameobject.x + j * TILE_WIDTH, this.gameobject.y - ((i + 1) * TILE_HEIGHT));
                setTimeout(() => temp2.Destroy(), 250);
            }
        }

        this.gameobject.Destroy();
    }

    OnReset()
    {
        if (this.timeout)
            clearTimeout(this.timeout);
    }
}

C4Mine.range = (TILE_WIDTH * 3) ** 2;

const C4 = {
    src: "../Sprites/Sprites.png",
    frame: [4, 2],
    behavior: [
        {
            type: C4Mine,
            args: [4, 10000]
        }
    ]
}