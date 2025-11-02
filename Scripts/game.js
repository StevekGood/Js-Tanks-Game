class Game
{
    constructor(ctx)
    {
        this.ctx = ctx;
    }

    Initialize()
    {   
        if (this.updateInterval)
        {
            clearInterval(this.updateInterval);
            clearInterval(this.bonusInterval);
            clearInterval(this.airstrikeInterval);
        }

        if (this.gameobjects)
            for (let i = 0; i < this.gameobjects.length; i++)
                this.gameobjects[i].OnReset();

        this.gameobjects = [];

        GameObject.Id = 0;
        PlayerInput.PlayerId = 0;

        let response = await fetch('../Maps/Maps.json', {mode: "cors"});
        let maps = await response.json();
        let neededTanksCount = Number(document.getElementById("player-select").value);

        if (maps.length > 0)
        {
            let map;
            if (this.lastMap && this.lastMap === 0 && maps.length === 1)
                map = 0;
            else
            {
                do
                    map = Math.floor(Math.random() * maps.length);
                while (this.lastMap !== undefined && map === this.lastMap);
            }

            let obj;
            let tanksCount = 0;
            for (let i = 0; i < maps[map].length; i++)
            {
                obj = maps[map][i];
                if (Number(obj.id) >= 3)
                {
                    if (tanksCount === neededTanksCount)
                        continue;

                    this.SpawnTank(Number(obj.x), Number(obj.y));
                    tanksCount++;
                }
                else
                {
                    let data = null;
                    switch (Number(obj.id))
                    {
                        case 0:
                            data = CRATE;
                            break;
                        case 1:
                            data = BRICK;
                            break;
                        case 2:
                            data = STEEL;
                            break;
                    }
                    
                    this.Spawn(data).GoTo(Number(obj.x) * TILE_WIDTH, Number(obj.y) * TILE_HEIGHT);
                }
            }

            this.lastMap = map;
        }
        else
        {
            this.SpawnTank(1, MAP_HEIGHT / TILE_HEIGHT - 2);
            if (neededTanksCount >= 2)
                this.SpawnTank(MAP_WIDTH / TILE_WIDTH - 2, 1);
            if (neededTanksCount >= 3)
                this.SpawnTank(MAP_WIDTH / TILE_WIDTH - 2, MAP_HEIGHT / TILE_HEIGHT - 2);
            if (neededTanksCount === 4)
                this.SpawnTank(1, 1);
        }

        this.updateInterval = setInterval(this.Update.bind(this), 33);
        this.bonusInterval = setInterval(this.SetBonus.bind(this), 3000);

        this.airstrikeChance = 0.02;
        this.airstrikeInterval = setInterval(this.ChanceAirstrike.bind(this), 7000);
    }

    SetBonus()
    {
        let x = 0, y = 0;
        const maxX = MAP_WIDTH / TILE_WIDTH, maxY = MAP_HEIGHT / TILE_HEIGHT;
        let spawn;
        let temp;

        for (let i = 0; i < 100; i++)
        {
            x = Math.floor(Math.random() * maxX) * TILE_WIDTH;
            y = Math.floor(Math.random() * maxY) * TILE_HEIGHT;

            spawn = true;
            for (let j = 0; j < this.gameobjects.length; j++)
            {
                temp = this.gameobjects[j].GetBehavior(Damageble);
                if (x === this.gameobjects[j].x && y === this.gameobjects[j].y && (!temp || (temp && temp.health < 0)))
                    spawn = false;
            }

            if (spawn)
            {
                this.Spawn(PICKABLES[Math.floor(Math.random() * PICKABLES.length)]).GoTo(x, y);
                return;
            }
        }

        throw new Error("Possible infinity loop");
    }

    Spawn(config)
    {
        let gameobj = new GameObject(config, this);
        this.gameobjects.push(gameobj);
        return gameobj;
    }

    SpawnTank(x, y)
    {
        let temp = this.Spawn(TANK);
        temp.sprite.Colorize(TANK_COLORS[PlayerInput.PlayerId - 1]);
        temp.GoTo(x * TILE_WIDTH, y * TILE_HEIGHT);
    }

    Destroy(gameobject)
    {
        for (let i = 0; i < this.gameobjects.length; i++) 
        {    
            if (this.gameobjects[i].id === gameobject.id)
            {
                gameobject.OnReset();
                this.gameobjects.splice(i, 1);
                return;
            }
        }
    }

    Update()
    {
        this.ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        for (let i = 0; i < this.gameobjects.length; i++)
        {
            this.gameobjects[i].Update(this.ctx);
        }
    }

    ChanceAirstrike()
    {
        if (this.airstrikeChance > Math.random())
        {
            this.airstrikeChance /= 10;
            this.Airstrike(null, 2, 1);
        }
        else
            this.airstrikeChance *= 2;
    }

    Airstrike(sender, damage, extraAirstrikes = 0)
    {
        let mapWidth = MAP_WIDTH / TILE_WIDTH, mapHeight = MAP_HEIGHT / TILE_HEIGHT;

        for (let j = 0; j < Math.floor(Math.random() * 2) + 2 + extraAirstrikes; j++)
        {
            let velocityX = Math.random() < 0.5;
            let negVelocity = Math.random() < 0.5;
            let pos = 0;
            let temp;
            if (velocityX)
            {
                pos = Math.floor(Math.random() * (mapHeight)) * TILE_HEIGHT;
                for (let i = 0; i < mapWidth; i++)
                {
                    temp = this.Spawn(MARK);
                    temp.GoTo((negVelocity ? (mapWidth - i - 1) : i) * TILE_WIDTH, pos);
                    temp.GetBehavior(Mark).StartMark(sender, damage, i);
                }
            }
            else
            {
                pos = Math.floor(Math.random() * (mapWidth)) * TILE_WIDTH;
                for (let i = 0; i < mapHeight; i++)
                {
                    temp = this.Spawn(MARK);
                    temp.GoTo(pos, (negVelocity ? (mapHeight - i - 1) : i) * TILE_HEIGHT);
                    temp.GetBehavior(Mark).StartMark(sender, damage, i);
                }
            }
            temp = this.Spawn(PLANE);
            temp.GoTo((velocityX ? (negVelocity ? MAP_WIDTH - TILE_WIDTH : 0) : pos), (!velocityX ? (negVelocity ? MAP_HEIGHT - TILE_HEIGHT : 0) : pos));
            temp.GetBehavior(Plane).StartPlane(velocityX ? (negVelocity ? -1 : 1) : 0, !velocityX ? (negVelocity ? -1 : 1) : 0);
        }
    }
}
