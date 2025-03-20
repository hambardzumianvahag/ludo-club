const playBtn = document.querySelector('.playBtn');
const container = document.querySelector('.container')
const finalScore = document.querySelector('.finalScore')

const path = [
  "translate(0,0)", // 1
  "translate(0,27px)", // 2
  "translate(0,54px)", //3
  "translate(0, 81px)", // 4
  "translate(0, 108px)", // 5

  "translate(27px, 135px)", // 6
  
  "translate(54px, 135px)", // 7
  "translate(81px, 135px)", // 8
  "translate(108px, 135px)", // 9
  "translate(135px, 135px)", // 10
  "translate(162px, 135px)", // 11

  "translate(162px, 162px)", // 12
  "translate(162px, 189px)", // 13
  
  "translate(135px, 189px)", // 14
  "translate(108px, 189px)", // 15
  "translate(81px, 189px)", // 16
  "translate(54px, 189px)", // 17
  "translate(27px, 189px)", // 18

  "translate(0, 216px)", // 19

  "translate(0, 243px)", // 20
  "translate(0, 270px)", // 21
  "translate(0, 297px)", // 22
  "translate(0, 324px)", // 23
  "translate(0, 351px)", // 24

  "translate(-27px, 351px)", // 25
  "translate(-54px, 351px)", // 26

  "translate(-54px, 324px)", // 27
  "translate(-54px, 297px)", // 28
  "translate(-54px, 270px)", // 29
  "translate(-54px, 243px)", // 30
  "translate(-54px, 216px)", // 31

  "translate(-81px, 189px)", // 32

  "translate(-108px, 189px)", // 33
  "translate(-135px, 189px)", // 34
  "translate(-162px, 189px)", // 35
  "translate(-189px, 189px)", // 36
  "translate(-216px, 189px)", // 37

  "translate(-216px, 162px)", // 38
  "translate(-216px, 135px)", // 39

  "translate(-189px, 135px)", // 40
  "translate(-162px, 135px)", // 41
  "translate(-135px, 135px)", // 42
  "translate(-108px, 135px)", // 43
  "translate(-81px, 135px)", // 44

  "translate(-54px, 108px)", // 45

  "translate(-54px, 81px)", // 46
  "translate(-54px, 54px)", // 47
  "translate(-54px, 27px)", // 48
  "translate(-54px, 0px)", // 49
  "translate(-54px, -27px)", // 50

  "translate(-27px, -27px)", // 51

  "translate(-27px, 0px)", // 52
  "translate(-27px, 27px)", // 53
  "translate(-27px, 54px)", // 54
  "translate(-27px, 81px)", // 55
  "translate(-27px, 108px)", // 56
  "translate(-27px, 135px)", // 57
]

// start page

playBtn.addEventListener('click', ()=>{
  container.style.display='block'
  playBtn.style.display='none'
  
  // creating store place

  for(let i = 1; i <= 2; i++) {
    let startDiv = document. createElement('div');
    startDiv.classList.add('storeDiv', `store${i}`)
    for(let j = 1; j <= 4; j++){
      let p = document.createElement('p');
      p.innerHTML=j
      p.classList.add('eachElement', j)
      startDiv.append(p)
    }
    container.append(startDiv);
  }

  // creating cubes and throw button

  for(let i = 1; i <= 2; i++){
    let cube = document.createElement('div')
    cube.classList.add('cube')
    cube.classList.add(`cube-${i}`)
    cube.innerHTML=1
    container.append(cube)
  }

  // creating throw button

  let clickBtn = document.createElement('button')
  clickBtn.innerHTML='throw'
  clickBtn.classList.add('throwBtn')
  clickBtn.classList.add('firstPlayerMove')
  container.append(clickBtn)

  // move place

  for(let i =1; i<=2; i++){
    let moveSection =document.createElement('div')
    moveSection.classList.add('moveSection', `moveSection-${i}`)
    for(let j = 0; j< path.length; j++){
      let moveDiv = document.createElement('div');
      moveDiv.style.transform = path[j]
      moveSection.append(moveDiv)
      if (j === path.length -1){
        moveDiv.innerHTML = `<p>&#x1F3C1;</p>`
      }
    }
    container.append(moveSection)
  } 

  // global variables

  let turn = 'first';
  let score1 = 0;
  let score2 = 0;
  let active1 = [];
  let active2 = [];
  let positions1 = [];
  let positions2 = [];

  // checking winner
  
  function checkWinner(){
    if(score1 === 4){
      finalScore.innerHTML = 'Player 1 Wins'
      container.style.display = 'none'
    } else if(score2 === 4){
      finalScore.innerHTML = 'Player 2 Wins'
      container.style.display = 'none'
    }
  }

  // moving function (main)

  function movePiece(i, steps, activeArr, positionsArr, currentTurn){
    let oldIndex = positionsArr[i]
    let newIndex= oldIndex + steps > path.length - 1 ? oldIndex : oldIndex + steps
    if(newIndex >= path.index){
      ////////////////////////////////////////////
      return false
    }
    positionsArr[i] = newIndex
    activeArr[i].style.transform = path[newIndex]
    if(newIndex === path.length -1){
        activeArr[i].remove()
        activeArr.splice(i, 1);
        positionsArr.splice(i, 1);
      if (currentTurn === 'first') {
          score1++;
      } else {
          score2++;
      }
    }
    return true
  }

  // throw button functionality

  clickBtn.addEventListener('click', ()=>{
    let cube1 = document.querySelector('.cube-1')
    let cube2 = document.querySelector('.cube-2')

    let num = Math.floor(Math.random() * 6) + 1;
    
    // checking the winner

    checkWinner()

    ///////////////////////////// first player ///////////////////////////////

    if(turn === 'first'){
      cube1.innerHTML = num;
      cube2.innerHTML = 1;
       
      // if first num is not 6 and we have not any active element` pass
      if (active1.length === 0 && num < 6) {
        turn = 'second';
        clickBtn.classList.remove('firstPlayerMove');
        clickBtn.classList.add('secondPlayerMove');
        return;
      }

      if(num === 6){
        clickBtn.style.display = 'none'
        
        const actionDiv = document.createElement('div')
        actionDiv.classList.add('actionDiv', 'action-1')
        let store1 = document.querySelector('.store1')
        let storePieces = document.querySelectorAll('.store1 p')

        // total actives and finisheds
        let total1 = active1.length + score1
        
        if (total1 < 4) {
          // create button for creating new element
          const newElemBtn = document.createElement('button');
          newElemBtn.innerHTML = 'Add next element';
          newElemBtn.addEventListener('click', () => {
              let nextNum = active1.length + score1 + 1;
              for (let item of storePieces) {
                  if (item.innerHTML == nextNum) {
                      store1.removeChild(item)
                      break
                  }
              }
              // create new element
              let newElement = document.createElement('p')
              newElement.innerHTML = nextNum

              let firstSquare = document.querySelector('.moveSection-1 div')
              firstSquare.append(newElement)
              active1.push(newElement);
              positions1.push(0)
              active1[active1.length -1].style.transform = path[0]
              actionDiv.remove()
              clickBtn.style.display = 'block'
          });
          actionDiv.appendChild(newElemBtn)
        }
        // if i already have active element and the cube value is 6
        if (active1.length > 0) {
          let helperText = document.createElement('p')
          helperText.innerHTML = 'Move an element'
          actionDiv.appendChild(helperText)
          // creating move options
          for (let i = 0; i < active1.length; i++) {
              let pieceBtn = document.createElement('button')
              let pieceNumber = active1[i].innerHTML
              pieceBtn.innerHTML = pieceNumber
              pieceBtn.addEventListener('click', () => {
                  let distance = num
                  let success = movePiece(i, distance, active1, positions1, 'first')
                  if (success) {
                      checkWinner()
                      actionDiv.remove();
                      clickBtn.style.display = 'block'
                  }
              })
              actionDiv.appendChild(pieceBtn)
          }
        }
        store1.after(actionDiv);
      } 
      // if cube value is less than 6
      else{
        // if only one active element
        if(active1.length === 1){
          let distance = num
          let success = movePiece(0, distance, active1, positions1, 'first')
          if(success){
            checkWinner();
          }
          turn = 'second'
          clickBtn.classList.remove('firstPlayerMove');
          clickBtn.classList.add('secondPlayerMove');
        }
        // if active elements is more than 1
        else if(active1.length > 1){
          clickBtn.style.display = 'none'
          const actionDiv = document.createElement('div')
          actionDiv.classList.add('actionDiv', 'action-1')
          let store1 = document.querySelector('.store1')
          let helperText = document.createElement('p')
          helperText.innerHTML = 'Which element to move:';
          actionDiv.appendChild(helperText);

          for (let i = 0; i < active1.length; i++) {
            let pieceBtn = document.createElement('button')
            let pieceNumber = active1[i].innerHTML
            pieceBtn.innerHTML = pieceNumber
            pieceBtn.addEventListener('click', () => {
                let distance = num
                let success = movePiece(i, distance, active1, positions1, 'first')
                if (success) {
                    checkWinner();
                    actionDiv.remove()
                    turn = 'second'
                    clickBtn.classList.remove('firstPlayerMove')
                    clickBtn.classList.add('secondPlayerMove')
                    clickBtn.style.display = 'block'
                }
            });
            actionDiv.appendChild(pieceBtn)
          }
          store1.after(actionDiv)
        }
      }
    } 

    /////////////////////  second (same with second) ///////////////////////////////    
      else{
        cube2.innerHTML = num;
        cube1.innerHTML = 1;
         
        // if first num is not 6 and we have not any active element` pass
        if (active2.length === 0 && num < 6) {
          turn = 'first';
          clickBtn.classList.add('firstPlayerMove');
          clickBtn.classList.remove('secondPlayerMove');
          return;
        }
  
        if(num === 6){
          clickBtn.style.display = 'none'
          
          const actionDiv = document.createElement('div')
          actionDiv.classList.add('actionDiv', 'action-2')
          let store2 = document.querySelector('.store2')
          let storePieces = document.querySelectorAll('.store2 p')
  
          // total actives and finisheds
          let total2 = active2.length + score2
          
          if (total2 < 4) {
            // create button for creating new element
            const newElemBtn = document.createElement('button');
            newElemBtn.innerHTML = 'Add next element';
            newElemBtn.addEventListener('click', () => {
                let nextNum = active2.length + score2 + 1;
                for (let item of storePieces) {
                    if (item.innerHTML == nextNum) {
                        store2.removeChild(item)
                        break
                    }
                }
                // create new element
                let newElement = document.createElement('p')
                newElement.innerHTML = nextNum
  
                let firstSquare = document.querySelector('.moveSection-2 div')
                firstSquare.append(newElement)
                active2.push(newElement);
                positions2.push(0)
                active2[active2.length -1].style.transform = path[0]
                actionDiv.remove()
                clickBtn.style.display = 'block'
            });
            actionDiv.appendChild(newElemBtn)
          }
          // if i already have active element and the cube value is 6
          if (active2.length > 0) {
            let helperText = document.createElement('p')
            helperText.innerHTML = 'Move an element'
            actionDiv.appendChild(helperText)
            // creating move options
            for (let i = 0; i < active2.length; i++) {
                let pieceBtn = document.createElement('button')
                let pieceNumber = active2[i].innerHTML
                pieceBtn.innerHTML = pieceNumber
                pieceBtn.addEventListener('click', () => {
                    let distance = num
                    let success = movePiece(i, distance, active2, positions2, 'first')
                    if (success) {
                        checkWinner()
                        actionDiv.remove();
                        clickBtn.style.display = 'block'
                    }
                })
                actionDiv.appendChild(pieceBtn)
            }
          }
          store2.after(actionDiv);
        } 
        // if cube value is less than 6
        else{
          // if only one active element
          if(active2.length === 1){
            let distance = num
            let success = movePiece(0, distance, active2, positions2, 'first')
            if(success){
              checkWinner();
            }
            turn = 'first'
            clickBtn.classList.add('firstPlayerMove');
            clickBtn.classList.remove('secondPlayerMove');
          }
          // if active elements is more than 1
          else if(active2.length > 1){
            clickBtn.style.display = 'none'
  
            const actionDiv = document.createElement('div')
            actionDiv.classList.add('actionDiv', 'action-2')
            let store2 = document.querySelector('.store2')
  
            let helperText = document.createElement('p')
            helperText.innerHTML = 'Which element to move:';
            actionDiv.appendChild(helperText);
  
            for (let i = 0; i < active2.length; i++) {
              let pieceBtn = document.createElement('button')
              let pieceNumber = active2[i].innerHTML
              pieceBtn.innerHTML = pieceNumber
              pieceBtn.addEventListener('click', () => {
                  let distance = num
                  let success = movePiece(i, distance, active2, positions2, 'first')
                  if (success) {
                      checkWinner();
                      actionDiv.remove()
                      turn = 'first'
                      clickBtn.classList.add('firstPlayerMove')
                      clickBtn.classList.remove('secondPlayerMove')
                      clickBtn.style.display = 'block'
                  }
              });
              actionDiv.appendChild(pieceBtn)
            }
            store2.after(actionDiv)
          }
        }
    }
  })
})

