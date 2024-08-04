class MachinegunMod extends WeaponModifier
{
    StartMod(gameobject)
    {
        this.gameobject = gameobject;
        this.Shoot();
        setTimeout(this.Shoot.bind(this), 500);
    }

    Shoot()
    {
        for (let i = -1; i < 2; i++) 
        {
            for (let j = -1; j < 2; j++) 
            {
                if (i === 0 && j === 0)
                    continue;

                let bullet = this.gameobject.gameInstance.Spawn(BULLET2);
                bullet.GoTo(this.gameobject.x + i * 8, this.gameobject.y + j * 8);
                bullet.GetBehavior(Bullet).StartBullet({
                    velocityX: i,
                    velocityY: j,
                    sender: this.gameobject
                });
            }    
        }
    }
}