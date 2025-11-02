const GAME = new Game(document.getElementById("game-canvas").getContext("2d"));

function StartGame()
{
    let response = await fetch('../Maps/Maps.json', {mode: "cors"});
    let maps = await response.json();
    GAME.Initialize(maps);
}

let gettingInput = false;
function PrintInput(e)
{
    console.log(e.code);
}

function GetInput(state)
{
    if (state)
    {
        if (gettingInput)
            return;

        window.addEventListener("keyup", PrintInput);
        gettingInput = true;
    }
    else
    {
        if (!gettingInput)
        return;
    
        window.removeEventListener("keyup", PrintInput);
        gettingInput = false;
    }
}
