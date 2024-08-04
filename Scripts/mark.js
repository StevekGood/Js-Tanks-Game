class Mark extends Behavior
{
    StartMark(sender, damage, i)
    {
        this.sender = sender;
        this.damage = damage;
        this.timeout = setTimeout(this.Explode.bind(this), 1250 + i * 75);
    }

    Explode()
    {
        this.gameobject.sprite.frame = EXPLOSION.frame;
        this.gameobject.hitboxWidth = TILE_WIDTH;
        this.gameobject.hitboxHeight = TILE_HEIGHT;
        this.gameobject.Move(0, 0);
        this.gameobject.hitboxWidth = 0;
        this.gameobject.hitboxHeight = 0;
        setTimeout(() => this.gameobject.Destroy(), 250);
    }

    OnCollide(gameobject)
    {
        if (!gameobject || (this.sender && gameobject.id === this.sender.id))
            return;

        let temp = gameobject.GetBehavior(Damageble);
        if (temp)
            temp.TakeDamage(this.damage);
    }

    OnReset()
    {
        if (this.timeout)
            clearTimeout(this.timeout);
    }
}