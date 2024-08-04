class PlayerInput extends Behavior
{
    constructor()
    {
        super();
        this.bindsHold = [false, false, false, false]
        this.binds = PlayerInput.Binds[PlayerInput.PlayerId];
        PlayerInput.PlayerId++;
    }

    Initialize(gameobject)
    {
        super.Initialize(gameobject);
        this.inputTargets = [];
        this.state = {
            velocityX: 0,
            velocityY: 0,
            buttonA: false,
            buttonB: false
        }

        for (let i = 0; i < gameobject.behavior.length; i++)
            if (gameobject.behavior[i] instanceof Inputable)
                this.inputTargets.push(gameobject.behavior[i]);

        this.UpdateInputData();
        this.onkeydownHandler = this.OnKeyDown.bind(this);
        this.onkeyupHandler = this.OnKeyUp.bind(this);
        window.addEventListener("keydown", this.onkeydownHandler);
        window.addEventListener("keyup", this.onkeyupHandler);
    }

    OnReset()
    {
        window.removeEventListener("keydown", this.onkeydownHandler);
        window.removeEventListener("keyup", this.onkeyupHandler);
        this.state = {
            velocityX: 0,
            velocityY: 0,
            buttonA: false,
            buttonB: false
        }
        this.bindsHold = [false, false, false, false];
        this.UpdateInputData();
        this.inputTargets = [];
    }

    OnBehaviorAdded(newBehavior)
    {
        if (newBehavior instanceof Inputable)
            this.inputTargets.push(newBehavior)
    }

    OnKeyDown(e)
    {
        switch(e.code)
        {
            case this.binds.velocityX:
                if (this.bindsHold[0])
                    return;

                this.bindsHold[0] = true;
                this.state.velocityX += 1;
                break;
            case this.binds.negVelocityX:
                if (this.bindsHold[1])
                    return;

                this.bindsHold[1] = true;
                this.state.velocityX -= 1;
                break;
            case this.binds.velocityY:
                if (this.bindsHold[2])
                    return;

                this.bindsHold[2] = true;
                this.state.velocityY -= 1;
                break;
            case this.binds.negVelocityY:
                if (this.bindsHold[3])
                    return;

                this.bindsHold[3] = true;
                this.state.velocityY += 1;
                break;
            case this.binds.buttonA:
                if (this.state.buttonA)
                    return;

                this.state.buttonA = true;
                break;
            case this.binds.buttonB:
                if (this.state.buttonB)
                    return;

                this.state.buttonB = true;
                break;
            default:
                return;
        }

        this.UpdateInputData();
    }

    OnKeyUp(e)
    {
        switch(e.code)
        {
            case this.binds.velocityX:
                this.bindsHold[0] = false;
                this.state.velocityX -= 1;
                break
            case this.binds.negVelocityX:
                this.bindsHold[1] = false;
                this.state.velocityX += 1;
                break;
            case this.binds.velocityY:
                this.bindsHold[2] = false;
                this.state.velocityY += 1;
                break
            case this.binds.negVelocityY:
                this.bindsHold[3] = false;
                this.state.velocityY -= 1;
                break;
            case this.binds.buttonA:
                this.state.buttonA = false;
                break;
            case this.binds.buttonB:
                this.state.buttonB = false;
                break;
            default:
                return;
        }

        this.UpdateInputData();
    }

    UpdateInputData()
    {
        for (let i = 0; i < this.inputTargets.length; i++)
            this.inputTargets[i].UpdateInputData(this.state);
    }
}

PlayerInput.PlayerId = 0;
PlayerInput.Binds = [
    {
        velocityX: "KeyD",
        negVelocityX: "KeyA",
        velocityY: "KeyW",
        negVelocityY: "KeyS",
        buttonA: "KeyZ",
        buttonB: "KeyX"
    },
    {
        velocityX: "ArrowRight",
        negVelocityX: "ArrowLeft",
        velocityY: "ArrowUp",
        negVelocityY: "ArrowDown",
        buttonA: "Numpad1", // Comma
        buttonB: "Numpad2" // Period
    },
    {
        velocityX: "KeyJ",
        negVelocityX: "KeyG",
        velocityY: "KeyY",
        negVelocityY: "KeyH",
        buttonA: "KeyK",
        buttonB: "KeyL"
    }
]