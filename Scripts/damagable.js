class Damageble extends Behavior
{
    health = -1;

    constructor(health) 
    {
        super();
        this.maxHealth = health;
        this.health = health;
    }

    TakeDamage(damage)
    {
        let temp = this.gameobject.gameInstance.Spawn(EXPLOSION);
        temp.GoTo(this.gameobject.x, this.gameobject.y);
        setTimeout(() => temp.Destroy(), 250);
        
        if (this.health < 0)
            return;

        this.health -= damage;

        if (this.health <= 0)
            this.gameobject.Destroy();
    }

    Heal(h)
    {
        if (this.health < 0 || this.health === this.maxHealth)
            return;

        this.health += h;
        if (this.health > this.maxHealth)
            this.health = this.maxHealth;
    }
}