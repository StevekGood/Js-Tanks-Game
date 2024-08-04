class PickableHeal extends Pickable
{
    constructor(health)
    {
        super();
        this.health = health;
    }

    OnCollide(gameobject)
    {
        let temp = gameobject.GetBehavior(Damageble);
        if (temp)
        {
            temp.Heal(this.health);
            this.gameobject.Destroy();
        }
    }
}