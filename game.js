class Room1 extends AdventureScene {
    constructor() {
        super("room1", "Room 1");
    }

    onEnter() {

        let sugar = this.add.text(this.w * 0.3, this.w * 0.3, "🍯 gummy worm sugar")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("It'd be too suspicious if a key ingredient went missing.");
                this.shake(sugar);
            });
            this.describe(sugar, "Standard sugar used to flavor gummy worms. This batch at least seems like typical sour sugar.");

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
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

        let notes1 = this.add.text(50, 50, "📝 notes on the sugar")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("You copy down the most important details about the sour sugar mentioned.")
                this.gainItem('sour sugar notes');
            })
            this.describe(notes1, "Research notes detailing the process of creating the sour sugar on the gummy worms. They emphasize making the flavor more addictive.")

    }
}

class Room2 extends AdventureScene {
    constructor() {
        super("room2", "Room 2");
    }
    onEnter() {

    }
}

class Room3 extends AdventureScene {
    constructor() {
        super('room3')
    }

    onEnter() {}
}

class SecretRoom extends AdventureScene {
    constructor() {
        super('secretroom')
    }

    onEnter() {}
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        let introText = this.add.text(50,50, "A certain corporation has been oddly eager to distribute its gummy worms for gummy worm chai lately. Upon consulting a group you work with, you decide to sneak into their gummy worm labs to see what the deal with them is...")
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
        this.add.text(50, 50, "That's all!").setFontSize(50);
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

