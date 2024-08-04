const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;
const MAP_WIDTH = 256;
const MAP_HEIGHT = 256;

const CRATE = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: TILE_WIDTH,
    hitboxHeight: TILE_HEIGHT,
    frame: [1, 0],
    behavior: [
        {
            type: Damageble,
            args: [2]
        }
    ]
}

const BRICK = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: TILE_WIDTH,
    hitboxHeight: TILE_HEIGHT,
    frame: [2, 0],
    behavior: [
        {
            type: Damageble,
            args: [5]
        }
    ]
}

const STEEL = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: TILE_WIDTH,
    hitboxHeight: TILE_HEIGHT,
    frame: [1, 4],
    behavior: [
        {
            type: Damageble,
            args: [-1]
        }
    ]
}

const TANK = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: TILE_WIDTH - 2,
    hitboxHeight: TILE_HEIGHT - 2,
    frame: [0, 0],
    behavior: [
        {
            type: Tank,
            args: []
        },
        {
            type: Damageble,
            args: [8]
        },
        {
            type: PlayerInput,
            args: []
        }
    ]
}

const TANK_COLORS = [
    [0, 1, 0],
    [1, 0, 0],
    [0, 1, 1],
    [1, 1, 0]
]

const EXPLOSION = {
    src: "../Sprites/Sprites.png",
    frame: [2, 3]
}

const SHIELD = {
    src: "../Sprites/Sprites.png",
    frame: [3, 4],
    behavior: [
        {
            type: Shield,
            args: []
        }
    ]
}

const PLANE = {
    src: "../Sprites/Sprites.png",
    frame: [5, 1],
    behavior: [
        {
            type: Plane,
            args: [5]
        }
    ]
}

const MARK = {
    src: "../Sprites/Sprites.png",
    frame: [5, 0],
    behavior: [
        {
            type: Mark,
            args: []
        }
    ]
}


const BULLET = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 4,
    hitboxHeight: 4,
    isTrigger: true,
    frame: [3, 0],
    behavior: [
        {
            type: Bullet,
            args: [1, 3]
        }
    ]
}

const BULLET2 = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 4,
    hitboxHeight: 4,
    isTrigger: true,
    frame: [3, 0],
    behavior: [
        {
            type: Bullet,
            args: [1, 2]
        }
    ]
}

const LASER = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 4,
    hitboxHeight: 4,
    frame: [3, 2],
    behavior: [
        {
            type: Laser,
            args: [1, 200]
        }
    ]
}

const LANDMINE = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 10,
    hitboxHeight: 10,
    isTrigger: true,
    frame: [1, 3],
    behavior: [
        {
            type: Landmine,
            args: [2, 40000]
        }
    ]
}

const HEAL = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [1, 2],
    behavior: [
        {
            type: PickableHeal,
            args: [2]
        }
    ]
}

const SUPER_HEAL = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [0, 4],
    behavior: [
        {
            type: PickableHeal,
            args: [5]
        }
    ]
}

const PICKABLE_SHIELD = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [2, 4],
    behavior: [
        {
            type: PickableShield,
            args: [10000]
        }
    ]
}

const PICKABLE_SPEED = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [4, 3],
    behavior: [
        {
            type: PickableSpeed,
            args: [2, 12000]
        }
    ]
}

const PICKABLE_AIRSTRIKE = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [4, 4],
    behavior: [
        {
            type: PickableAirstrike,
            args: [2, 500]
        }
    ]
}

const WEAPON1 = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [1, 1],
    behavior: [
        {
            type: PickableWeapon,
            args: [new MachinegunMod(2, 5000)]
        }
    ]
}

const WEAPON2 = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [2, 1],
    behavior: [
        {
            type: PickableWeapon,
            args: [new LaserMod(3, 4000)]
        }
    ]
}

const WEAPON3 = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [2, 2],
    behavior: [
        {
            type: PickableWeapon,
            args: [new LandmineMod(6, 1250)]
        }
    ]
}

const WEAPON4 = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [4, 0],
    behavior: [
        {
            type: PickableWeapon,
            args: [new C4Mod(2, 3000)]
        }
    ]
}

const WEAPON5 = {
    src: "../Sprites/Sprites.png",
    hitboxWidth: 8,
    hitboxHeight: 8,
    isTrigger: true,
    frame: [4, 1],
    behavior: [
        {
            type: PickableWeapon,
            args: [new ShpatelMod(3, 2000)]
        }
    ]
}


const OBSTACLES = [CRATE, BRICK, STEEL];
const PICKABLES = [HEAL, SUPER_HEAL, PICKABLE_SPEED, PICKABLE_SHIELD, PICKABLE_AIRSTRIKE, WEAPON1, WEAPON2, WEAPON3, WEAPON4, WEAPON5];