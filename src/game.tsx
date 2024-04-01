import { useState, useEffect } from "react";

import { AppBar, Button, Box, Toolbar, Typography } from "@mui/material";

import Help from "./help";
import GameStage from "./stage";

import "./css/layout.css"

import { GameState, Position } from "./types";
import Solution from "./solution";
import { checkGameSolution, GameSolutionCheck } from "./utils";
import getGameData from "./data";


export default function GameLayout() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [numMoves, setNumMoves] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [gameState, setGameState] = useState(GameState.Init);
  const [shapePositions, setShapePositions] = useState<Map<number, Position | null>>(new Map());
  const [solutionData, setSolutionData] = useState<GameSolutionCheck>({ success: false, violation_message: null });

  const game = getGameData();

  useEffect(() => {
    gameState == GameState.Started && setTimeout(() => setElapsedSeconds(elapsedSeconds + 1), 1000);
  }, [elapsedSeconds, gameState]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <b>Tetrum</b>
            </Typography>
            <Box alignContent="center" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ marginRight: "50px" }}
                variant="contained"
                disabled={gameState == GameState.Started || gameState == GameState.Finished}
                onClick={() => setGameState(GameState.Started)}
              >
                Start Game
              </Button>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Moves: {numMoves}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Elapsed Time: {elapsedSeconds}
            </Typography>
            <Box alignContent="center" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ marginRight: "50px" }}
                variant="contained"
                disabled={gameState != GameState.Started}
                onClick={() => {
                  const solution_check = checkGameSolution(game.board, game.shapes, shapePositions);
                  if (solution_check.success) {
                    setGameState(GameState.Finished);
                  }
                  else {
                    setGameState(GameState.Stopped);
                  }
                  setSolutionData(solution_check);
                  setShowSolution(true);
                }}
              >
                Check Solution
              </Button>
            </Box>
            <Box alignContent="center">
              <Button
                variant="contained"
                onClick={() => setShowHelp(true)}
              >
                How To Play
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <GameStage
            game={game}
            width={1100}
            height={600}
            gameState={gameState}
            handleShapeMove={() => setNumMoves(numMoves + 1)}
            handleShapePositionUpdate={(shape_index: number, pos: Position | null) => {
              const new_map = new Map(shapePositions);
              new_map.set(shape_index, pos);
              setShapePositions(new_map);
            }}
          />
        </Box>
      </Box >
      <Help
        show={showHelp}
        handleClose={() => { setShowHelp(false); }}
      />
      <Solution
        show={showSolution}
        handleClose={() => { setShowSolution(false); }}
        success={solutionData.success}
        violation_message={solutionData.violation_message}
      />
    </>
  )
}