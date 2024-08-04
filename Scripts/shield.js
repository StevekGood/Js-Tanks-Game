class Shield extends Behavior
{
    StartShield(target)
    {
        this.target = target;
    }

    Update()
    {
        this.gameobject.GoTo(this.target.x, this.target.y);
    }
}