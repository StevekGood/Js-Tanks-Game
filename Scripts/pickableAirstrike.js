class PickableAirstrike extends Pickable
{
    constructor(damage, time)
    {
        super();
        this.damage = damage;
        this.time = time;
    }

    OnCollide(gameobject)
    {
        if (!gameobject.GetBehavior(Tank))
            return;

        setTimeout(() => gameobject.gameInstance.Airstrike(gameobject, this.damage), this.time);
        this.gameobject.Destroy();
    }
}