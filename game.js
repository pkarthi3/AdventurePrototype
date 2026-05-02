class Room1 extends AdventureScene {
    constructor() {
        super("room1", "Room 1");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.shake(clip);
            });
            this.describe(clip, "Metal, bent.");

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('room2');
                }
            })

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

