import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export default function GameCanvas() {
    const gameRef = useRef(null);

    useEffect(() => {
        // We'll add Phaser code here.

        // Don't create a new game if one already exists
        if (gameRef.current) return;

        // Create the game configuration
        const config = {
            type: Phaser.AUTO, 
            width: 800,
            height: 400,
            parent: 'phaser-game',
            backgroundColor: '#2e7d32',
            physics : {
                default: 'arcade', 
                arcade: {
                    gravity: { y: 800}, 
                    debug: false
                }
            },
            scene: {
                create: function() {
                    // Add field title 
                    this.add.text(20, 20, "Mega-Futbol Field", {
                        color: '#ffffff',
                        fontSize: '24px'
                    });
                    
                    // Create player (simple blue circle)
                    this.player = this.add.circle(400, 360, 20, 0x3b82f6);
                    this.physics.add.existing(this.player);
                    this.player.body.setBounce(0);
                    this.player.body.setCollideWorldBounds(true);

                    // Create soccer ball (starts from max height and falls down!)
                    this.ball = this.add.circle(400, 20, 15, 0xff6600); // Start at very top (Y=20)
                    this.physics.add.existing(this.ball);
                    this.ball.body.setBounce(0.8); // SUPER bouncy! (120% bounce back)
                    this.ball.body.setCollideWorldBounds(true);

                    // Make ball and player collide with each other
                    this.physics.add.collider(this.player, this.ball);

                    // Less friction so ball moves more freely
                    this.ball.body.setDrag(30); // Reduced from 100 to 30

                    // Make ball lighter so it's easier to move
                    this.ball.body.setMass(0.2); // Reduced from 0.5 to 0.2

                    // Create simple goal posts
                    // Left Goal Frame (90 pixels tall)
                    this.leftPost1 = this.add.rectangle(12, 355, 6, 90, 0xffffff);  // Y moved to 355
                    this.leftPost2 = this.add.rectangle(38, 355, 6, 90, 0xffffff);  // Y moved to 355
                    this.leftCrossbar = this.add.rectangle(25, 310, 32, 6, 0xffffff);  // Crossbar at Y=310

                    // Add physics to left goal parts
                    this.physics.add.existing(this.leftPost1, true);
                    this.physics.add.existing(this.leftPost2, true);
                    this.physics.add.existing(this.leftCrossbar, true);

                    // Right Goal Frame (90 pixels tall)
                    this.rightPost1 = this.add.rectangle(762, 355, 6, 90, 0xffffff); // Y moved to 355
                    this.rightPost2 = this.add.rectangle(788, 355, 6, 90, 0xffffff); // Y moved to 355
                    this.rightCrossbar = this.add.rectangle(775, 310, 32, 6, 0xffffff); // Crossbar at Y=310

                    // Add physics to right goal parts
                    this.physics.add.existing(this.rightPost1, true);
                    this.physics.add.existing(this.rightPost2, true);
                    this.physics.add.existing(this.rightCrossbar, true);

                    // Make ball bounce off crossbars only (not posts)
                    this.physics.add.collider(this.ball, [this.leftCrossbar, this.rightCrossbar]);

                    // Create arrow key controls
                    this.cursors = this.input.keyboard.createCursorKeys();

                    // Add score display
                    this.scoreText = this.add.text(350, 50, 'Score: 0 - 0', {
                        color: '#ffffff',
                        fontSize: '20px'
                    });
                    this.leftScore = 0;
                    this.rightScore = 0;
                    this.spaceWasPressed = false;
                },
                update: function() {
                    // Horizontal movement
                    if (this.cursors.left.isDown) {
                        this.player.body.setVelocityX(-200);
                    } else if (this.cursors.right.isDown) {
                        this.player.body.setVelocityX(200);
                    } else {
                        this.player.body.setVelocityX(0);
                    }
                    
                    // Jumping (only if on ground)
                    if (this.cursors.up.isDown && this.player.body.blocked.down) {
                        this.player.body.setVelocityY(-500);
                    }

                    // Kicking - press SPACE to kick ball (simple version)
                    if (this.cursors.space.isDown) {
                        // Check if ball is close during kick
                        let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.ball.x, this.ball.y);
                        if (distance < 50) {
                            // Kick the ball with power
                            let kickX = (this.ball.x - this.player.x) * 12;
                            let kickY = (this.ball.y - this.player.y) * 12 - 100;
                            this.ball.body.setVelocity(kickX, kickY);
                        }
                    }

                    // Debug: Show ball position only when near goals
                    // Goal detection - Left goal (for 90-pixel tall posts)
                    if (this.ball.x < 25 && this.ball.x > 15 && this.ball.y > 310 && this.ball.y < 395) {
                        this.rightScore++;
                        this.scoreText.setText(`Score: ${this.leftScore} - ${this.rightScore}`);
                        this.ball.setPosition(400, 20); // Ball drops from sky after goal!
                        this.ball.body.setVelocity(0, 0);
                    }

                    // Goal detection - Right goal (for 90-pixel tall posts)
                    if (this.ball.x > 775 && this.ball.x < 785 && this.ball.y > 310 && this.ball.y < 395) {
                        this.leftScore++;
                        this.scoreText.setText(`Score: ${this.leftScore} - ${this.rightScore}`);
                        this.ball.setPosition(400, 20); // Ball drops from sky after goal!
                        this.ball.body.setVelocity(0, 0);
                    }
                }
            }
        };

        // Create the game
        gameRef.current = new Phaser.Game(config);
        
        // Cleanup function - runs when component unmounts
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, [])

    return <div id = 'phaser-game' className = 'w-full max-w-4xl mx-auto'></div>
}