class Landmine extends Behavior
{
    constructor(damage, time)
    {
        super();
        this.damage = damage;
        this.time = time;
    }

    StartMine(sender)
    {
        this.sender = sender;
        this.gameobject.GoTo(sender.x, sender.y);

        this.timeout = setTimeout(() => this.DestroyMine(), this.time);
    }

    DestroyMine()
    {
        this.timeout = null;
        let temp = this.gameobject.gameInstance.Spawn(EXPLOSION);
        temp.GoTo(this.gameobject.x, this.gameobject.y);
        setTimeout(() => temp.Destroy(), 250);

        this.gameobject.Destroy();
    }

    OnReset()
    {
        if (this.timeout)
            clearTimeout(this.timeout);
    }

    OnCollide(gameobject)
    {
        if (!gameobject || this.sender.id === gameobject.id)
            return;

        let temp = gameobject.GetBehavior(Damageble);
        if (temp)
        {
            temp.TakeDamage(this.damage);
            this.gameobject.Destroy();
        }
    }
}