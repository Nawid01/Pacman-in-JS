
// // ---------------PACMAN----------------------
// import { colors } from "./colors.js";
// import { createInterface } from 'readline';
// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let pacMan = {
//   position: { x: 0, y: 0 },
//   score: 0,
// };

// let pellets = [
//   { x: 2, y: 2 },
//   { x: 4, y: 4 },
//   {x: 4, y: 1},
//   {x: 1, y: 3},
//   // ... weitere Punkte
// ];

// function printGameBoard() {
//   console.clear();
//   for (let i = 0; i < 5; i++) {
//     let row = '';
//     for (let j = 0; j < 5; j++) {
//       if (pacMan.position.x === j && pacMan.position.y === i) {
//         row += `${colors.brightYellow}P${colors.reset} `;
//       } else if (pellets.find((pellet) => pellet.x === j && pellet.y === i)) {
//         row += `${colors.brightWhite}.${colors.reset} `;
//       } else {
//         row += '  ';
//       }
//     }
//     console.log(row);
//   }
//   console.log(`Score: ${pacMan.score}`);
// }

// function movePacMan(direction) {
//   switch (direction) {
//     case 'up':
//       pacMan.position.y = Math.max(pacMan.position.y - 1, 0);
//       break;
//     case 'down':
//       pacMan.position.y = Math.min(pacMan.position.y + 1, 4);
//       break;
//     case 'left':
//       pacMan.position.x = Math.max(pacMan.position.x - 1, 0);
//       break;
//     case 'right':
//       pacMan.position.x = Math.min(pacMan.position.x + 1, 4);
//       break;
//   }
// }

// function checkCollision() {
//   const pelletIndex = pellets.findIndex(
//     (pellet) => pellet.x === pacMan.position.x && pellet.y === pacMan.position.y
//   );
//   if (pelletIndex !== -1) {
//     pacMan.score += 10;
//     pellets.splice(pelletIndex, 1);
//   }
// }

// function startGame() {
//   console.log(`${colors.red}Welcome${colors.reset} ${colors.brightBlue}to${colors.reset} ${colors.brightYellow}Pac-Man${colors.reset} ${colors.brightCyan}Console Edition!${colors.reset}`);
//   printGameBoard();

//   function promptUser() {
//     rl.question('Enter your move (up, down, left, right): ', (input) => {
//       const direction = input.trim().toLowerCase();
//       if (['up', 'down', 'left', 'right'].includes(direction)) {
//         movePacMan(direction);
//         checkCollision();
//         printGameBoard();
//         if (pellets.length === 0) {
//           console.log('Congratulations! You ate all the pellets. Game over.');
//           rl.close();
//         } else {
//           promptUser();
//         }
//       } else {
//         console.log('Invalid input. Please enter a valid direction.');
//         promptUser();
//       }
//     });
//   }

//   promptUser();
// }

// startGame();






























// ---------------PACMAN----------------------
import { colors } from "./colors.js";
import { createInterface } from 'readline';
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const boardSize = 7; // Größe des Spielfelds
const wallChar = '|'; // Zeichen für die Wände
const obstacleChar = '#'; // Zeichen für die Hindernisse

let pacMan = {
  position: { x: 1, y: 1 },
  score: 0,
};

let pellets = [
  { x: 2, y: 2 },
  { x: 4, y: 4 },
  { x: 4, y: 1 },
  { x: 1, y: 3 },
  // ... weitere Punkte
];

// Hindernisse im Spielfeld
let obstacles = [
  { x: 1, y: 4 },
  { x: 3, y: 2 },
  // ... weitere Hindernisse
];

function printGameBoard() {
  console.clear();
  for (let i = 0; i < boardSize; i++) {
    let row = '';
    for (let j = 0; j < boardSize; j++) {
      if (i === 0 || i === boardSize - 1 || j === 0 || j === boardSize - 1) {
        // Äußere Wände
        row += `${colors.brightRed}${wallChar}${colors.reset} `;
      } else if (pacMan.position.x === j && pacMan.position.y === i) {
        // Pac-Man
        row += `${colors.brightYellow}P${colors.reset} `;
      } else if (pellets.find((pellet) => pellet.x === j && pellet.y === i)) {
        // Punkte
        row += `${colors.brightWhite}.${colors.reset} `;
      } else if (obstacles.find((obstacle) => obstacle.x === j && obstacle.y === i)) {
        // Hindernisse
        // row += `${colors.brightBlack}${obstacleChar}${colors.reset} `;
      } else {
        row += '  ';
      }
    }
    console.log(row);
  }
  console.log(`\n${colors.brightGreen}Score:${colors.reset} ${colors.brightYellow}${pacMan.score}${colors.reset}\n`);
}

function movePacMan(direction) {
  switch (direction) {
    case 'up':
      pacMan.position.y = Math.max(pacMan.position.y - 1, 1);
      break;
    case 'down':
      pacMan.position.y = Math.min(pacMan.position.y + 1, boardSize - 2);
      break;
    case 'left':
      pacMan.position.x = Math.max(pacMan.position.x - 1, 1);
      break;
    case 'right':
      pacMan.position.x = Math.min(pacMan.position.x + 1, boardSize - 2);
      break;
  }
}

function checkCollision() {
  const pelletIndex = pellets.findIndex(
    (pellet) => pellet.x === pacMan.position.x && pellet.y === pacMan.position.y
  );
  if (pelletIndex !== -1) {
    pacMan.score += 10;
    pellets.splice(pelletIndex, 1);
  }
}

function startGame() {
  console.log(`${colors.red}Welcome${colors.reset} ${colors.brightBlue}to${colors.reset} ${colors.brightYellow}Pac-Man${colors.reset} ${colors.brightCyan}Console Edition!${colors.reset}`);
  printGameBoard();

  function promptUser() {
    rl.question(`${colors.brightMagenta}Enter your move (${colors.reset} ${colors.blue}up${colors.reset},${colors.brightCyan} down${colors.reset},${colors.brightYellow} left${colors.reset},${colors.red} right${colors.reset}${colors.brightMagenta}):${colors.reset} `, (input) => {
      const direction = input.trim().toLowerCase();
      if (['up', 'down', 'left', 'right'].includes(direction)) {
        movePacMan(direction);
        checkCollision();
        printGameBoard();
        if (pellets.length === 0) {
          console.log(`${colors.brightYellow}Congratulations!${colors.reset} ${colors.blue}You ate all the pellets. Game over.${colors.reset}`);
          rl.close();
        } else {
          promptUser();
        }
      } else {
        console.log(`${colors.red}Invalid input. Please enter a valid direction.${colors.reset}`);
        promptUser();
      }
    });
  }

  promptUser();
}

startGame();