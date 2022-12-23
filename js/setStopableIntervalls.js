
let intervalIDS = []

/**
 * defines a stoppable interval
 * @param {*} fn 
 * @param {*} time - defines the duration of the interval
 */
function setStoppableInterval(fn, time) {
   let id =  setInterval(fn, time)
   intervalIDS.push(id)
}


/**
 * stops the interval
 */
function stopInterval() {
    intervalIDS.forEach(clearInterval)
}

