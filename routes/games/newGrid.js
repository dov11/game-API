const getNewGrid = () => {
	let newGrid = [
    {
      tileIndex: 1,
      content: 1,
    },
    {
      tileIndex: 2,
      content: -1,
    },
    {
      tileIndex: 3,
      content: 1,
    },
    {
      tileIndex: 4,
      content: 2,
    },
    {
      tileIndex: 5,
      content: 2,
    },
    {
      tileIndex: 6,
      content: 1,
    },
    {
      tileIndex: 7,
      content: -1,
    },
    {
      tileIndex: 8,
      content: 1,
    },
    {
      tileIndex: 9,
      content: 0,
    },
  ]

  // 
  // const row = 5;
	// const col = 5;
	// const mines = 5;
  // let index = 1;
  // let randomGrid = []
  // let attemps = 0;
  // let tile
  //
  // // generate mines
  // const minesArray = []
  // while (minesArray.length < mines) {
  //   var randomnumber = Math.floor(Math.random() * (col * row) ) + 1;
  //   if(minesArray.indexOf(randomnumber) > -1) continue;
  //   minesArray[minesArray.length] = randomnumber;
  //   if ( attemps > 200 ) return false
  //   attemps++
  // }
  //
  // // generate new empty grid
  // for (var r = 0; r < row; r++) {
  //   for (var c = 0; c < col; c++) {
  //     tile = {}
  //     tile = { index: index }
  //     if ( minesArray.includes(index) ) {
  //       console.log(index, ' = mine');
  //       tile.content = -1
  //     }
  //     randomGrid.push(tile)
  //     index++;
  //   }
  // }

  newGrid = [
    {
      index: 1,
      content: 0
    },
    {
      index: 2,
      content: 1
    },
    {
      index: 3,
      content: -1
    },
    {
      index: 4,
      content: 1
    },
    {
      index: 5,
      content: 0
    },
    {
      index: 6,
      content: 0
    },
    {
      index: 7,
      content: 2
    },
    {
      index: 8,
      content: 2
    },
    {
      index: 9,
      content: 3
    },
    {
      index: 10,
      content: 1
    },
    {
      index: 11,
      content: 0
    },
    {
      index: 12,
      content: 1
    },
    {
      index: 13,
      content: -1
    },
    {
      index: 14,
      content: 2
    },
    {
      index: 15,
      content: -1
    },
    {
      index: 16,
      content: 0
    },
    {
      index: 17,
      content: 2
    },
    {
      index: 18,
      content: 3
    },
    {
      index: 19,
      content: 4
    },
    {
      index: 20,
      content: 2
    },
    {
      index: 21,
      content: 0
    },
    {
      index: 22,
      content: 1
    },
    {
      index: 23,
      content: -1
    },
    {
      index: 24,
      content: -1
    },
    {
      index: 25,
      content: 1
    }
  ]


	// console.log('randomGrid:', randomGrid);
  // return randomGrid
  return newGrid
}

module.exports = getNewGrid
