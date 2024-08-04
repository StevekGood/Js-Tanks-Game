class LandmineMod extends WeaponModifier
{
    StartMod(gameobject)
    {
        gameobject.gameInstance.Spawn(LANDMINE).GetBehavior(Landmine).StartMine(gameobject);
    }
}