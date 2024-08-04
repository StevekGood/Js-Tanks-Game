class LaserMod extends WeaponModifier
{
    StartMod(gameobject)
    {
        let direction = gameobject.GetBehavior(Tank).GetDirection();
        gameobject.gameInstance.Spawn(LASER).GetBehavior(Laser).StartLaser({
            velocityX: direction[0],
            velocityY: direction[1],
            sender: gameobject
        });
    }
}