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

                    
                    
                    // Create player 1 (blue circle - left side)
                    this.player = this.add.circle(200, 360, 20, 0x3b82f6);
                    this.physics.add.existing(this.player);
                    this.player.body.setBounce(0);
                    this.player.body.setCollideWorldBounds(true);

                    // Create player 2 (red circle - right side)  
                    this.player2 = this.add.circle(600, 360, 20, 0xff3333);
                    this.physics.add.existing(this.player2);
                    this.player2.body.setBounce(0);
                    this.player2.body.setCollideWorldBounds(true);

                    // Create soccer ball (starts from max height and falls down!)
                    this.ball = this.add.circle(400, 20, 15, 0xff6600);
                    this.physics.add.existing(this.ball);
                    this.ball.body.setBounce(0.8);
                    this.ball.body.setCollideWorldBounds(true);

                    // Add friction to ball so it slows down naturally
                    this.ball.body.setDrag(30);

                    // Make ball lighter so it's easier to move
                    this.ball.body.setMass(0.2);

                    // Make all objects collide with each other
                    this.physics.add.collider(this.player, this.player2);
                    this.physics.add.collider(this.player, this.ball);
                    this.physics.add.collider(this.player2, this.ball);

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

                    // Add WASD controls for player 2
                    this.wasd = this.input.keyboard.addKeys('W,S,A,D,Q');  

                    // Add score display
                    this.scoreText = this.add.text(350, 50, 'Score: 0 - 0', {
                        color: '#ffffff',
                        fontSize: '20px'
                    });
                    this.leftScore = 0;
                    this.rightScore = 0;
                    this.spaceWasPressed = false;

                    this.matchTime = 30; // 30 seconds
                    this.timerText = this.add.text(350, 20, 'Time: 0:30', {
                        color: '#ffffff',
                        fontSize: '18px'
                    });
                    this.matchEnded = false;

                },
                update: function() {
                    // Timer countdown logic
                    if (!this.matchEnded && this.matchTime > 0) {
                        // Decrease timer by 1/60th of a second each frame (60 FPS)
                        this.matchTime -= 1/60;
                        
                        // Update timer display every frame
                        let minutes = Math.floor(this.matchTime / 60);
                        let seconds = Math.floor(this.matchTime % 60);
                        this.timerText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
                        
                        // Check if match ended
                        if (this.matchTime <= 0) {
                            this.matchEnded = true;
                            
                            // Determine winner
                            let winnerText = '';
                            if (this.leftScore > this.rightScore) {
                                winnerText = 'BLUE PLAYER WINS!';
                            } else if (this.rightScore > this.leftScore) {
                                winnerText = 'RED PLAYER WINS!';
                            } else {
                                winnerText = "IT'S A TIE!";
                            }
                            
                            this.timerText.setText(`Time: 0:00 - ${winnerText}`);
                            // Stop all movement when match ends
                            this.player.body.setVelocity(0, 0);
                            this.player2.body.setVelocity(0, 0);
                            this.ball.body.setVelocity(0, 0);
                        }
                    }

                    // Skip player controls if match ended
                    if (this.matchEnded) return;

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

                    // Player 2 Controls (WASD)
                    // Horizontal movement
                    if (this.wasd.A.isDown) {
                        this.player2.body.setVelocityX(-200);
                    } else if (this.wasd.D.isDown) {
                        this.player2.body.setVelocityX(200);
                    } else {
                        this.player2.body.setVelocityX(0);
                    }

                    // Jumping (only if on ground)
                    if (this.wasd.W.isDown && this.player2.body.blocked.down) {
                        this.player2.body.setVelocityY(-500);
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

                    // Player 2 Kicking - press Q to kick ball
                    if (this.wasd.Q.isDown) {
                        // Check if ball is close during kick
                        let distance2 = Phaser.Math.Distance.Between(this.player2.x, this.player2.y, this.ball.x, this.ball.y);
                        if (distance2 < 50) {
                            // Kick the ball with power
                            let kickX2 = (this.ball.x - this.player2.x) * 12;
                            let kickY2 = (this.ball.y - this.player2.y) * 12 - 100;
                            this.ball.body.setVelocity(kickX2, kickY2);
                        }
                    }

                    // Debug: Show ball position only when near goals
                    // Goal detection - Left goal
                    if (this.ball.x < 25 && this.ball.x > 15 && this.ball.y > 310 && this.ball.y < 395) {
                        this.rightScore++;
                        this.scoreText.setText(`Score: ${this.leftScore} - ${this.rightScore}`);
                        this.ball.setPosition(400, 20); // Ball drops from sky
                        this.ball.body.setVelocity(0, 0);
                        
                        // Reset players to their sides
                        this.player.setPosition(200, 360);   // Blue player - left side
                        this.player2.setPosition(600, 360);  // Red player - right side
                    }

                    // Goal detection - Right goal
                    if (this.ball.x > 775 && this.ball.x < 785 && this.ball.y > 310 && this.ball.y < 395) {
                        this.leftScore++;
                        this.scoreText.setText(`Score: ${this.leftScore} - ${this.rightScore}`);
                        this.ball.setPosition(400, 20); // Ball drops from sky
                        this.ball.body.setVelocity(0, 0);
                        
                        // Reset players to their sides
                        this.player.setPosition(200, 360);   // Blue player - left side
                        this.player2.setPosition(600, 360);  // Red player - right side
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