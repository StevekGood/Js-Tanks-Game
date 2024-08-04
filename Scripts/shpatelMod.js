class ShpatelMod extends WeaponModifier
{
    StartMod(gameobject)
    {
        let direction = gameobject.GetBehavior(Tank).GetDirection();
        gameobject.gameInstance.Spawn(BRICK).GoTo(gameobject.x + direction[0] * TILE_WIDTH, gameobject.y + direction[1] * TILE_HEIGHT);
    }
}