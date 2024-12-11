# The Game Of Life by Xavi Ortega

Conway's Game of Life is a cellular automaton devised by the British
mathematician John Horton Conway in 1970.

## Specs

The current state of the game have full support for mouse and touch interactions, 
including one keyboard interaction to play/pause the game.

The features covered in the game are:
- The user can configure a board from 3x3 to 1000x1000
- The user can toggle cell state between alive and dead by clicking on a cell or dragging through multiple cells
- The user can use the controls board at any time to
  - Play/pause the game
  - Reset the board
  - Save the current state of the game in a JSON file
  - Upload a JSON file to load any other game state that was saved
  - Change the delay between rounds
  - Enable/disabled grid drawing
  - Configure amount of rows and cols
- The user can see regular feedback with toasts, when interacting with controls board
- The user can collapse/expand the controls board to have more space in small screens
- Small screens are supported from 320px on
- Multiple colors are supported. When a cell is activated it will take the most prevalent color among its neighbors or a random color if there are none 
- Touch screens are fully supported.

## Performance
- The game is tested up to 1000x1000 grid with 300k cells. Each round with that amount of cells takes around 1 second, and while the population decreases the performance improves. 


## Possible improvements
- Make the game accessible by adding more shortcuts for all controls and allowing to fill the cells with the keyboard
- Include time travel
- Include possibility of zooming in the board
- Move next generation calculation to a web worker to prevent UI from getting blocked
- Include more presets

## How to run

After cloning and installing, you can run `dev` script.

```bash
npm run dev
```

## Presets

There's a preset that can be generated via `preset` script:
1. `cell-wars`: Will separate the board in 4 quadrants and generate random clusters of cells of each color per quadrant simulating a 4 side cell war.

The preset will take rows and columns as arguments.

```bash
npm run preset -- --pattern="cell-wars" --rows=1000 --cols=1000
```

When script is finished, it will save the preset output in `presets/generated`, and it will be ready to be imported to the game.

## Tests

The tests are set up with Jest. There's a `test` script to run them all.

```bash
npm run test
```

There's also a `coverage` script to generate a JSON report at `coverage/coverage-summary.json`

```bash
npm run coverage
```
