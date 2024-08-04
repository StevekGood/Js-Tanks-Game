class Bullet extends Behavior
{
    damage = 1;
    speed = 1;
    velocityX = 0;
    velocityY = 0;
    sender = null;

    constructor(damage, speed)
    {
        super();
        this.damage = damage;
        this.speed = speed;
    }

    StartBullet(config)
    {
        this.sender = config.sender;
        this.velocityX = config.velocityX;
        this.velocityY = config.velocityY;

        if (this.velocityX !== 0)
            this.gameobject.sprite.frame = [3, 1];
    }

    OnCollide(gameobject)
    {
        if (!gameobject)
        {
            this.gameobject.Destroy();
            return;
        }
        else if (gameobject.id === this.sender.id)
            return;

        let temp = gameobject.GetBehavior(Damageble);
        if (temp)
        {
            temp.TakeDamage(this.damage);
            this.gameobject.Destroy();
        }
    }

    Update()
    {
        this.gameobject.Move(this.velocityX * this.speed, this.velocityY * this.speed);
    }
}