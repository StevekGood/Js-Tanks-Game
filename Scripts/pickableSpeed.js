class PickableSpeed extends Pickable
{
    constructor(speedMod, time)
    {
        super();
        this.speedMod = speedMod;
        this.time = time;
    }

    OnCollide(gameobject)
    {
        let temp = gameobject.GetBehavior(Tank);
        if (temp)
        {
            if (temp.speed === this.speedMod)
            {
                this.gameobject.Destroy();
                return;
            }

            this.oldSpeed = temp.speed;
            temp.speed = this.speedMod;
            this.timeout = setTimeout(() => temp.speed = this.oldSpeed, this.time);
            this.gameobject.Destroy();
        }
    }
}