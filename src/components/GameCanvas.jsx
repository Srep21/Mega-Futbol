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
                    
                    // Create player at center of field
                    this.player = this.add.circle(400, 200, 20, 0x3b82f6);
                    this.physics.add.existing(this.player);
                    this.player.body.setBounce(0);
                    this.player.body.setCollideWorldBounds(true);

                    // Create soccer ball
                    this.ball = this.add.circle(500, 200, 15, 0xff6600); // Orange ball, smaller than player
                    this.physics.add.existing(this.ball);
                    this.ball.body.setBounce(0.7); // Ball bounces more than player
                    this.ball.body.setCollideWorldBounds(true);

                    // Make ball and player collide with each other
                    this.physics.add.collider(this.player, this.ball);

                    // Add friction to ball so it slows down naturally
                    this.ball.body.setDrag(100);

                    // Make ball a bit heavier so it feels more realistic
                    this.ball.body.setMass(0.5);

                    // Create goal posts (from ground up)
                    // Left goal - two vertical posts and crossbar
                    this.add.rectangle(20, 330, 10, 140, 0xffffff); // Left post (from ground)
                    this.add.rectangle(20, 260, 10, 140, 0xffffff); // Right post (from ground)  
                    this.add.rectangle(20, 190, 10, 10, 0xffffff);  // Crossbar (top)

                    // Right goal - two vertical posts and crossbar
                    this.add.rectangle(780, 330, 10, 140, 0xffffff); // Left post (from ground)
                    this.add.rectangle(780, 260, 10, 140, 0xffffff); // Right post (from ground)
                    this.add.rectangle(780, 190, 10, 10, 0xffffff);  // Crossbar (top)
                    
                    // Create arrow key controls
                    this.cursors = this.input.keyboard.createCursorKeys();
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

                    // Kicking - press SPACE to kick the ball
                    if (this.cursors.space.isDown) {
                        // Check if ball is close to player
                        let distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.ball.x, this.ball.y);
                        if (distance < 50) {
                            // Calculate kick direction (from player to ball)
                            let kickX = (this.ball.x - this.player.x) * 10;
                            let kickY = (this.ball.y - this.player.y) * 10;

                            // Kick the ball!
                            this.ball.body.setVelocity(kickX, kickY);
                        
                        }
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