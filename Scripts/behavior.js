class Behavior
{
    gameobject = null;

    Initialize(gameobject)
    {
        this.gameobject = gameobject; 
    }

    OnBehaviorAdded(newBehavior) {}
    OnCollide(gameobject) {}
    OnReset() {}
    Update() {}
}