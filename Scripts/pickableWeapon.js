class PickableWeapon extends Pickable
{
    constructor(weapon)
    {
        super();
        this.weapon = weapon;
    }

    OnCollide(gameobject)
    {
        let temp = gameobject.GetBehavior(Tank);
        if (temp)
        {
            temp.SetWeapon(this.weapon);
            this.gameobject.Destroy();
        }
    }
}