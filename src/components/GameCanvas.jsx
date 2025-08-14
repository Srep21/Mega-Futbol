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
            scene: {
                create: function() {
                    // Add field title 
                    this.add.text(20, 20, "Mega-Futbol Field", {
                        color: '#ffffff',
                        fontSize: '24px'
                    });
                    // Create player at center of field
                    this.player = this.add.circle(400, 200, 20, 0x3b82f6);

                    // Create arrow key controls
                    this.cursors = this.input.keyboard.createCursorKeys();
                },
                update: function() {
                    // Check which keys are pressed and move player
                    if (this.cursors.left.isDown) {
                        this.player.x -= 5; // Move left
                    }
                    if (this.cursors.right.isDown) {
                        this.player.x += 5; // Move right
                    }
                    if (this.cursors.up.isDown) {
                        this.player.y -= 5; // Move up
                    }
                    if (this.cursors.down.isDown) {
                        this.player.y += 5; // Move down
                    }

                    // Keep player inside field boundaries
                    // Left boundary (player radius = 20)
                    if (this.player.x < 20) {
                        this.player.x = 20;
                    }
                    // Right boundary (field width = 800, minus player radius)
                    if (this.player.x > 780) {
                        this.player.x = 780;
                    }
                    // Top boundary
                    if (this.player.y < 20) {
                        this.player.y = 20;
                    }
                    // Bottom boundary (field height = 400, minus player radius)
                    if (this.player.y > 380) {
                        this.player.y = 380;
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