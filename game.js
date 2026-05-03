class Room1 extends AdventureScene {
    constructor() {
        super("room1", "Room 1");
    }

    onEnter() {

        let sugar = this.add.text(this.w * 0.3, this.w * 0.3, "🍯 gummy worm sugar")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("It'd be too suspicious to just take the whole jar.");
                this.shake(sugar);
            });
            this.describe(sugar, "Standard sugar used to flavor gummy worms. This batch at least seems like typical sour sugar.");

        let key = this.add.text(this.w * 0.5, this.w * 0.4, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("The door in this room is unlocked, but maybe you could use this to unlock something else...")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.pickupAnimation(key);
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 door to the next room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("You open the door.");
                this.gotoScene('room2');
            })
            this.describe(door, "A door to another part of the gummy worm labs.");

        let notes = this.add.text(this.w * 0.1, this.w * 0.45, "📝 notes on the sugar")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("You copy down the most important details about the sour sugar mentioned.")
                this.gainItem('sour sugar notes');
            })
            this.describe(notes, "Research notes detailing the process of creating the sour sugar on the gummy worms. They emphasize making the flavor more addictive.")

    }
}

class Room2 extends AdventureScene {
    constructor() {
        super("room2", "Room 2");
    }
    onEnter() {
        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 door to the next room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("You open the door.");
                this.gotoScene('room3');
            })
            this.describe(door, "A door to another part of the gummy worm labs.");

        let door2 = this.add.text(this.w * 0.4, this.w * 0.15, "🚪 hidden door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                if (this.hasItem('key')) {
                    this.showMessage("The key perfectly fits into the lock. You carefully open the door...");
                    this.gotoScene('secretroom');
                }
            })
            if (this.hasItem('key')) {
                this.describe(door2, "This door is locked, but maybe the key you found can open it.");
            } else {
                this.describe(door2, 'A well-hidden door in the wall. Considering that it\'s both hidden and locked, some shady things must be happening behind it...')
            }

         let door3 = this.add.text(this.w * 0.1, this.w * 0.5, "🚪 door to the previous room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("You open the door.");
                this.gotoScene('room1');
            })
            this.describe(door3, "A door to the room you were in before.");

        let notes = this.add.text(this.w * 0.3, this.w * 0.45, "📝 notes on the gummies")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("You copy down the most important details about the gummy base of the worms.")
                this.gainItem('gummy notes');
            })
            this.describe(notes, "Research notes detailing the process that the company went through to develop the gummy they use in their gummy worms. They also detail how the company made a gummy worm chai boom happen.");

        let box = this.add.text(this.w * 0.35, this.w * 0.4, "📦 locked box")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                if (this.hasItem('small key')) {
                    this.loseItem('small key');
                    this.pickupAnimation(box);
                    this.showMessage("You unlock the box, revealing the items inside...")
                    this.gainItem('secret ingredient')
                    this.gainItem('formula')
                }
            })
            if (this.hasItem('small key')) {
                this.describe(box, "That key you picked up earlier seems like it could unlock this box.")
            } else {
                this.describe(box, "A locked box. Maybe it has trade secrets inside...")
            }
        
            
    }
}

class Room3 extends AdventureScene {
    constructor() {
        super('room3', "Room 3")
    }

    onEnter() {
         let door = this.add.text(this.w * 0.1, this.w * 0.5, "🚪 door to the previous room")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("You open the door.");
                this.gotoScene('room2');
            })
            this.describe(door, "A door to the room you were in before.");

        let smallKey = this.add.text(this.w * 0.3, this.w * 0.3, "🔑 small key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.pickupAnimation(smallKey);
                this.gainItem('small key');
                this.showMessage("You pick up the key.")
            })
            this.describe(smallKey, "A key that's too small to open any of the doors here, but it might open something else.");

        let door2 = this.add.text(this.w * 0.3, this.w * 0.15, "🚪 exit to the gummy worm labs")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                if(this.hasItem('employee card')) {
                    if (this.hasItem('secret ingredient') && this.hasItem('formula')) {
                        this.showMessage("You leave the gummy worm labs with the company secrets in hand.");
                        this.gotoScene('outro');
                    } else {
                        this.showMessage("There still are some things left to discover about the company and its gummy worms...");
                    }
                } else {
                    this.showMessage("For whatever reason, the door is locked both ways...");
                }
            })
            this.describe(door2, "A door leading outside of the gummy worm labs.");

        let ingredients = this.add.text(this.w * 0.35, this.w * 0.4, "🧪 strange ingredients")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("It'd be too suspicious to just take the containers with you.");
                this.shake(ingredients);
            })
            this.describe(ingredients, "The typical artificial flavorings and chemicals one would expect gummy worms. At least, that's how they look...");

    }
}

class SecretRoom extends AdventureScene {
    constructor() {
        super('secretroom', "Secret Room")
    }

    onEnter() {
        
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        let introText = this.add.text(50,50, "A certain corporation has been oddly eager to distribute its gummy worms for gummy worm chai lately. Upon consulting a rebel group you work with, you decide to sneak into their gummy worm labs to see what the deal with them is...")
            .setFontSize(50)
            .setWordWrapWidth(this.game.config.width - 100)
        this.add.text(50,300, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('room1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "You head back to the rebel group's hideout with the secrets you've found. With the discoveries you've made, the gummy worm revolution is bound to happen any day.").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Room1, Room2, Room3, SecretRoom, Outro],
    title: "Secrets of the Gummy Worm Chai",
});

