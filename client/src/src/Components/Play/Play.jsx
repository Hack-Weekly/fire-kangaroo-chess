import './Play.css';
import { useState } from 'react';
import { Header } from '../Header/Header';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export const Play = () => {

  const [position, setPosition] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [highlightedSquares, setHighlightedSquares] = useState([]);

  const makeComputerMove = () => {
    const possibleMoves = position.moves();
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    const newComputerPosition = new Chess(position.fen())
    newComputerPosition.move(randomMove)
    setPosition(newComputerPosition)
  };

  const handleSquareClick = (square) => {
    const piece = position.get(square);

    if (piece && piece.color === position.turn()) {
      const possibleMoves = position.moves({ square, verbose: true});

      const highlightedSquares = possibleMoves.map((move) => move.to);
      setSelectedSquare(square);
      setHighlightedSquares(highlightedSquares);
      console.log(selectedSquare)
      console.log(highlightedSquares)
    } else {
      setSelectedSquare(null);
      setHighlightedSquares([]);
    }

    if (selectedSquare && highlightedSquares.includes(square)) {
      const move = position.move({
        from: selectedSquare,
        to: square,
        promotion: 'q'
      });

      if (move) {
        setPosition(position);
        setSelectedSquare(null);
        setHighlightedSquares([]);
        if (position.isGameOver()) {
          alert('Game Over');
        } else {
          makeComputerMove();
        }
      }
    }
  }

  const onDrop = (source, target) => {
    let move
    try {
        move = position.move({
        from: source,
        to: target,
        promotion: 'q',
      });
    } catch (e) {
      console.log(e)
    }

    if (move) {
      setPosition(position);
      setSelectedSquare(null);
      setHighlightedSquares([]);
      if (position.isGameOver()) {
        alert('Game over');
      } else {
        makeComputerMove();
      }
    }
  }

  return (
    <div id='chessComponent'>
        <header>
            <Header />
        </header>
        <section id='chessBoard'>
            <Chessboard 
              position={position.fen()} 
              onPieceDrop={onDrop}
              onSquareClick={handleSquareClick}
              customSquareStyles={{
                ...highlightedSquares.reduce((acc, cur) => ({ ...acc, [cur]: { backgroundColor: 'rgba(158,44,44,0.5)' } }), {}),
              }}
              customDarkSquareStyle={{backgroundColor: 'rgb(131, 65, 65)'}}
              customLightSquareStyle={{backgroundColor: 'rgb(235, 148, 148)'}}
            />
        </section>  
    </div>
  )
}