const GAME = new Game(document.getElementById("game-canvas").getContext("2d"));

async function LoadMaps()
{
    const pathTests = [
        '../Maps/Maps.json',
        './../Maps/Maps.json', 
        'Maps/Maps.json',
        '/Maps/Maps.json'
    ];
    
    for (const path of pathTests) {
        console.log(`Testing path: ${path}`);
        try {
            const response = await fetch(path);
            console.log(`   Status: ${response.status}`);
            
            if (response.ok) {
                const maps = await response.json();
                console.log(`success with path: ${path}`);
                return maps;
            }
        } catch (error) {
            console.log(`   Failed: ${error.message}`);
        }
    }
    
    throw new Error("All paths failed to load maps");
}

function StartGame()
{
    LoadMaps().then(maps => {
        GAME.Initialize(maps);
    });
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
