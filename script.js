const playBtn = document.querySelector('.playBtn');
const container = document.querySelector('.container')
const finalScore = document.querySelector('.finalScore')

// start page

playBtn.addEventListener('click', ()=>{
  container.style.display='block'
  playBtn.style.display='none'
  
  // creating store place

  for(let i = 1; i <= 2; i++) {
    let startDiv = document. createElement('div');
    startDiv.classList.add('storeDiv')
    startDiv.classList.add(`store${i}`)
    for(let j = 1; j <= 4; j++){
      let p = document.createElement('p');
      p.innerHTML=j
      p.classList.add('eachElement')
      p.classList.add(j)
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
  let clickBtn = document.createElement('button')
  clickBtn.innerHTML='throw'
  clickBtn.classList.add('throwBtn')
  clickBtn.classList.add('firstPlayerMove')
  container.append(clickBtn)

  // move place

  for(let i =1; i<=2; i++){
    let moveSection =document.createElement('div')
    moveSection.classList.add('moveSection')
    moveSection.classList.add(`moveSection-${i}`)
    for(let i = 1; i<=57;i++){
      let moveDiv = document.createElement('div');
      moveSection.append(moveDiv)
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
  let moveSection1 = document.querySelector('.moveSection-1 div')
  let moveSection2 = document.querySelector('.moveSection-2 div')

  // throw button functionality

  clickBtn.addEventListener('click', ()=>{
    let cube1 = document.querySelector('.cube-1')
    let cube2 = document.querySelector('.cube-2')
    let num = Math.round(Math.random(0,1)*6) || 1
    
    // winning part
    if(score1 === 4){
      finalScore.innerHTML = 'Player 1 Wins'
      container.style.display = 'none'
    } else if(score2 === 4){
      finalScore.innerHTML = 'Player 2 Wins'
      container.style.display = 'none'
    }

    ///////////////////////////// first player ///////////////////////////////

    if(turn === 'first'){
        cube1.innerHTML = num;
        cube2.innerHTML = 1;
        let elems = document.querySelectorAll('.moveSection-1 > div p')
        // removing after reaching finish line
        for(let i = 0; i < elems.length; i++){
          if(elems[i].style.transform == 'translateY(1512px)'){
            moveSection1.removeChild(elems[i])
            active1.splice(i,1)
            positions1.splice(i,1)
            score1++
          }
        }
        // first entry
        if(cube1.innerHTML >1 && active1.length === 0){ ///// change into 6
            let parentDiv = document.querySelector('.store1')
            let elements = document.querySelectorAll('.store1 p');
            
            // removing from store
            for(item of elements){
              if(item.innerText == score1+1){
                parentDiv.removeChild(parentDiv.childNodes[0])
                break;
              }
            }
            // adding removed element 
            let element = document.createElement('p')
            element.innerHTML = score1+1
            active1.push(element)
            positions1.push(0)
            moveSection1.append(element)
        } 
        // choose betwen moving current element or adding new
        else if(active1.length === 1){ //change into 6
          let throwBtn = document.querySelector('.throwBtn')
          
          if(cube1.innerHTML<6){ // change into less than 6
          let distance = cube1.innerHTML * 27
          let i = 0
          if(positions1[i] + distance < 1513) {
            positions1[i] += distance
            moveSection1.childNodes[0].style.transform= `translateY(${positions1[i]}px)`
          } 
          // trying to remove when its finishing (doesn't work)
          else if (positions1[i] + distance == 1512) {
            moveSection1.removeChild(active1[i])
            active1.splice(i,1)
            positions1.splice(i,1)
            score1++
          }
            turn = 'second'
            clickBtn.classList.remove('firstPlayerMove')
            clickBtn.classList.add('secondPlayerMove')
        } else if(cube1.innerHTML == 6){ // change into 6
          //playWithCurrentFunctionality
          const actionDiv = document.createElement('div')
          const newElem = document.createElement('button')
          const playWithCurrent = document.createElement('button')
          let parentDiv = document.querySelector('.store1')
          actionDiv.classList.add('actionDiv')
          actionDiv.classList.add('action-1')
          newElem.innerHTML = 'Add Next Element'
          playWithCurrent.innerHTML = 'Play with current Element'
          throwBtn.style.display='none'
          // trying to move current active(doesnt fully work)
          playWithCurrent.addEventListener('click', ()=>{
            throwBtn.style.display='flex'
            let distance = cube1.innerHTML * 27
            let i = active1.length-1
            if(positions1[i] + distance < 1513) {
              positions1[i] += distance
              moveSection1.childNodes[0].style.transform= `translateY(${positions1[i]}px)`
            } 
            actionDiv.remove()
          })
            //addNextElementFunctionality
            newElem.addEventListener('click', ()=>{
              let parentDiv = document.querySelector('.store1')
              let elements = document.querySelectorAll('.store1 p');
              throwBtn.style.display='flex'
              for(item of elements){
                if(item.innerText == active1.length+1){
                  parentDiv.removeChild(parentDiv.childNodes[0])
                  item.style.display = 'none';
                }
              }
              let element = document.createElement('p')
              element.innerHTML = active1.length+1
              active1.push(element)
              positions1.push(0)
              moveSection1.append(element)
              actionDiv.remove()
            })

          parentDiv.after(actionDiv)
          actionDiv.append(newElem)
          actionDiv.append(playWithCurrent)
          }
        } 
        // two or more active elements case (doesn't fully work, when the cube result is 6 we need to choose start with the new element or continue with one of the currents)
        else if(active1.length > 1){
            let actionDiv = document.createElement('div')
            actionDiv.classList.add('actionDiv')
            actionDiv.classList.add('action-1')
            let parentDiv = document.querySelector('.store1')
            // creating buttons for choosing which element to move
            for(let i =0; i< active1.length;i++){
              let playerBtn = document.createElement('button')
              playerBtn.innerHTML = i+1
              playerBtn.addEventListener('click', ()=>{
                let distance = num * 27
                let newPos = positions1[i]+distance

                if(newPos>=1512){
                  moveSection1.removeChild(active1[i])
                  active1.splice(i,1)
                  positions1.splice(i,1)
                  score1++
                } else {
                  positions1[i] = newPos
                  moveSection1.childNodes[i].style.transform = `translateY(${positions1[i]}px)`
                }
                actionDiv.remove()
                turn = 'second'
                clickBtn.classList.remove('firstPlayerMove')
                clickBtn.classList.add('secondPlayerMove')
              })
              actionDiv.append(playerBtn)
            }
            parentDiv.after(actionDiv)
          } else {
          turn = 'second'
          clickBtn.classList.remove('firstPlayerMove')
          clickBtn.classList.add('secondPlayerMove')
        }  
    } else{

      //////////////////////////////////////////////////// second (same with second)
        cube2.innerHTML = num;
        cube1.innerHTML = 1;
        let elems = document.querySelectorAll('.moveSection-2 > div p')
        // removing after reaching finish line
        for(let i = 0; i < elems.length; i++){
          if(elems[i].style.transform == 'translateY(1512px)'){
            moveSection2.removeChild(elems[i])
            active2.splice(i,1)
            positions2.splice(i,1)
            score2++
          }
        }
        // first entry
        if(cube2.innerHTML > 1 && active2.length === 0){ ///// change into 6
            let parentDiv = document.querySelector('.store2')
            let elements = document.querySelectorAll('.store2 p');
            
            // removing from store
            for(item of elements){
              if(item.innerText == score2+1){
                parentDiv.removeChild(parentDiv.childNodes[0])
                break;
              }
            }
            // adding removed element 
            let element = document.createElement('p')
            element.innerHTML = score2+1
            active2.push(element)
            positions2.push(0)
            moveSection2.append(element)
        } 
        // choose betwen moving current element or adding new
        else if(active2.length === 1){ //change into 6
          let throwBtn = document.querySelector('.throwBtn')
          
          if(cube2.innerHTML<6){ // change into less than 6
          let distance = cube2.innerHTML * 27
          let i = 0
          if(positions2[i] + distance < 1513) {
            positions2[i] += distance
            moveSection2.childNodes[0].style.transform= `translateY(${positions2[i]}px)`
          } 
          // trying to remove when its finishing (doesn't work)
          else if (positions2[i] + distance == 1512) {
            moveSection2.removeChild(active2[i])
            active2.splice(i,1)
            positions2.splice(i,1)
            score2++
          }
            turn = 'first'
            clickBtn.classList.add('firstPlayerMove')
            clickBtn.classList.remove('secondPlayerMove')
        } else if(cube2.innerHTML == 6){ // change into 6
          //playWithCurrentFunctionality
          const actionDiv = document.createElement('div')
          const newElem = document.createElement('button')
          const playWithCurrent = document.createElement('button')
          let parentDiv = document.querySelector('.store2')
          actionDiv.classList.add('actionDiv')
          actionDiv.classList.add('action-2')
          newElem.innerHTML = 'Add Next Element'
          playWithCurrent.innerHTML = 'Play with current Element'
          throwBtn.style.display='none'
          // trying to move current active(doesnt fully work)
          playWithCurrent.addEventListener('click', ()=>{
            throwBtn.style.display='flex'
            let distance = cube2.innerHTML * 27
            let i = active2.length-1
            if(positions2[i] + distance < 1513) {
              positions2[i] += distance
              moveSection2.childNodes[0].style.transform= `translateY(${positions2[i]}px)`
            } 
            actionDiv.remove()
          })
            //addNextElementFunctionality
            newElem.addEventListener('click', ()=>{
              let parentDiv = document.querySelector('.store2')
              let elements = document.querySelectorAll('.store2 p');
              throwBtn.style.display='flex'
              for(item of elements){
                if(item.innerText == active2.length+1){
                  parentDiv.removeChild(parentDiv.childNodes[0])
                  item.style.display = 'none';
                }
              }
              let element = document.createElement('p')
              element.innerHTML = active2.length+1
              active2.push(element)
              positions2.push(0)
              moveSection2.append(element)
              actionDiv.remove()
            })

          parentDiv.after(actionDiv)
          actionDiv.append(newElem)
          actionDiv.append(playWithCurrent)
          }
        } 
        // two or more active elements case (doesn't fully work, when the cube result is 6 we need to choose start with the new element or continue with one of the currents)
        else if(active2.length > 1){
            let actionDiv = document.createElement('div')
            actionDiv.classList.add('actionDiv')
            actionDiv.classList.add('action-2')
            let parentDiv = document.querySelector('.store2')
            // creating buttons for choosing which element to move
            for(let i =0; i< active2.length;i++){
              let playerBtn = document.createElement('button')
              playerBtn.innerHTML = i+1
              playerBtn.addEventListener('click', ()=>{
                let distance = num * 27
                let newPos = positions2[i]+distance

                if(newPos>=1512){
                  moveSection2.removeChild(active2[i])
                  active2.splice(i,1)
                  positions2.splice(i,1)
                  score2++
                } else {
                  positions2[i] = newPos
                  moveSection2.childNodes[i].style.transform = `translateY(${positions2[i]}px)`
                }
                actionDiv.remove()
                turn = 'first'
                clickBtn.classList.add('firstPlayerMove')
                clickBtn.classList.remove('secondPlayerMove')
              })
              actionDiv.append(playerBtn)
            }
            parentDiv.after(actionDiv)
          } else {
          turn = 'first'
          clickBtn.classList.add('firstPlayerMove')
          clickBtn.classList.remove('secondPlayerMove')
        }  
    }
  })
})

