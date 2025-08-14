import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export default function GameCanvas() {
    const gameRef = useRef(null);

    useEffect(() => {
        // We'll add Phaser code here.
        const config = {
            type: Phaser.AUTO, 
            width: 800,
            height: 400,
            parent: 'phaser-game',
            backgroundColor: '#2e7d32',
            scene: {
                create: function() {
                    // This function runs noce when the game starts
                    this.add.text(20, 20, "Mega-Futbol Field", {
                        color: '#ffffff',
                        fontSize: '24px'
                    });
                }
            }
        };

        // Create the game
        gameRef.current = new Phaser.Game(config);
        
    }, [])

    return <div id = 'phaser-game' className = 'w-full max-w-4xl mx-auto'></div>
}