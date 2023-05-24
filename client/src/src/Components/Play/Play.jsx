import './Play.css';
import { useState, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export const Play = () => {

  const [position, setPosition] = useState(new Chess())

  useEffect(() => {
    // If it's computer's turn make a move
    if (position.turn() === 'b') {
      const possibleMoves = position.moves();

      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

      const newComputerPosition = new Chess(position.fen())
      newComputerPosition.move(randomMove)
      setPosition(newComputerPosition)
    }
  }, [position])

  const onDrop = (source, target) => {
    const newPosition = new Chess(position.fen())

    newPosition.move({ from: source, to: target, promotion: 'q' }) 

    setPosition(newPosition)
    console.log(position.ascii())
  }

  return (
    <div id='chessComponent'>
        <header>
            <Header />
        </header>
        <section id='chessBoard'>
            <Chessboard position={position.fen()} onPieceDrop={onDrop} />
        </section>  
    </div>
  )
}