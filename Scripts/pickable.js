class Pickable extends Behavior
{
    Initialize(gameobject)
    {
        super.Initialize(gameobject);
        this.disappearTimeout = setTimeout(() => this.gameobject.Destroy(), Pickable.DisappearTime);
    }

    OnReset()
    {
        if (this.disappearTimeout)
            clearTimeout(this.disappearTimeout);
    }
}

Pickable.DisappearTime = 18000;