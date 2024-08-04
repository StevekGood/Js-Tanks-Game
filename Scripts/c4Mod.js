class C4Mod extends WeaponModifier
{
    StartMod(gameobject)
    {
        gameobject.gameInstance.Spawn(C4).GetBehavior(C4Mine).StartC4(gameobject);
    }
}