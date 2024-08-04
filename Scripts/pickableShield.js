class PickableShield extends Pickable
{
    constructor(time)
    {
        super();
        this.time = time;
    }

    OnCollide(gameobject)
    {
        let temp = gameobject.GetBehavior(Damageble);
        if (temp)
        {
            this.targetHealth = temp;
            this.savedHealth = temp.health;
            temp.health = -1;
            this.shield = gameobject.gameInstance.Spawn(SHIELD);
            this.shield.GetBehavior(Shield).StartShield(gameobject);
            this.timeout = setTimeout(this.DestroyShield.bind(this), this.time);
            this.gameobject.Destroy();
        }
    }

    DestroyShield()
    {
        this.targetHealth.health = this.savedHealth;
        this.shield.Destroy();
    }
}