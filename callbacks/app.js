
const btn = document.querySelector('button')



const moveX = (element, amount, delay, onSuccess, onFailure) => {
  const bodyBoundary = document.body.clientWidth
  const elRight = element.getBoundingClientRect().right;
  const currLeft = element.getBoundingClientRect().left;
  
  console.log(`${currLeft} , ${elRight} , ${bodyBoundary}`)
  if (elRight + amount > bodyBoundary) {
    onFailure()
  } else {
    setTimeout(() => {
      btn.style.transform = `translateX(${amount + currLeft}px)`
      onSuccess();
    }, delay)
  }
};

moveX(btn, 100, 1000, () => {
  moveX(btn, 100, 1000, () => {
    moveX(btn, 100, 1000, () => {
      moveX(btn, 100, 1000, () => {  
        moveX(btn, 100, 1000, () => {  
          moveX(btn, 100, 1000, () => {  
            moveX(btn, 600, 1000, () => {  
            })
          })
        })
      })
    })
  })
})