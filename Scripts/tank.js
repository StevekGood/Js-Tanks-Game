class Tank extends Inputable
{
    velocityX = 0;
    velocityY = 0;
    lastVelX = 0;
    lastVelY = 0;
    attack = false;
    attack2 = false;
    reloaded = true;
    reloaded2 = true;
    reloadTime = 650;
    reloadTime2 = 0;
    modifier = null;
    modCount = 0;
    speed = 1;

    SetWeapon(newWeapon)
    {
        this.modifier = newWeapon;
        this.modCount = this.modifier.weaponCount;
        this.reloadTime2 = this.modifier.reloadTime;
    }

    Update()
    {
        this.gameobject.Move(this.velocityX * this.speed, this.velocityY * this.speed);
        this.gameobject.sprite.frame = this.GetFrame();

        if (this.attack && this.reloaded)
            this.Shoot();

        if (this.attack2 && this.reloaded2 && this.modCount !== 0)
            this.Shoot2();
    }

    Shoot()
    {
        let bullet = this.gameobject.gameInstance.Spawn(BULLET);
        let direction = this.GetDirection();

        bullet.GoTo(this.gameobject.x + direction[0] * 8, this.gameobject.y + direction[1] * 8);
        bullet.GetBehavior(Bullet).StartBullet({
            velocityX: direction[0],
            velocityY: direction[1],
            sender: this.gameobject
        });
        this.reloaded = false;
        setTimeout(() => { this.reloaded = true }, this.reloadTime);
    }

    Shoot2()
    {
        this.modCount--;
        this.reloaded2 = false;
        this.modifier.StartMod(this.gameobject);
        setTimeout(() => { this.reloaded2 = true }, this.reloadTime2);
    }

    GetDirection()
    {
        switch(this.gameobject.sprite.frame[1])
        {
            case 0:
                return [0, -1];
            case 1:
                return [0, 1];
            case 2:
                return [1, 0];
            case 3:
                return [-1, 0];
            default:
                return [0, 0];
        }
    }

    GetFrame()
    {
        if (this.velocityX === 1)
            return [0, 2];
        else if (this.velocityX === -1)
            return [0, 3];
        else if (this.velocityY === -1)
            return [0, 0];
        else if (this.velocityY === 1)
            return [0, 1];
        else
            return this.gameobject.sprite.frame;
    }

    UpdateInputData(data)
    {
        this.attack = data.buttonA;
        this.attack2 = data.buttonB;
        this.velocityX = data.velocityX;
        this.velocityY = data.velocityY;

        if (data.velocityX !== 0 && data.velocityY !== 0)
        {
            if (this.velocityX === this.lastVelX)
                this.velocityX = 0;
            else
                this.velocityY = 0;
        }

        this.lastVelX = data.velocityX;
        this.lastVelY = data.velocityY;
    }
}