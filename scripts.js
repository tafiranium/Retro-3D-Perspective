function randInt(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}

class retro {
  constructor() {
    this.starWrap = document.querySelector(".retro .stars")
    this.buildWrap = document.querySelector(".retro .buildings")
    this.mounWrap = document.querySelector(".retro .mountains")
    this.ground = document.querySelector(".ground")
    this.genMountain()
    this.genBuild()
    this.genStars()
    this.genLines()
  }

  genLines() {
    let vlc = 20
    let glc = 15
    let vlines = this.ground.querySelector(".vlines")
    let glines = this.ground.querySelector(".glines")

    for (let i=0; i<glc;i++) {
      let stick = document.createElement('span')
      stick.classList.add('gl')
      glines.appendChild(stick)
    }
    for (let i=0; i<vlc;i++) {
        let stick = document.createElement('span')
        stick.classList.add('vl')
        vlines.appendChild(stick)
      }
  }
  
  genMountain() {
    let left = this.mounWrap.querySelector(".left")
    let right = this.mounWrap.querySelector('.right')
    let lc = ""
    let corners = randInt(9, 10)
    let x_step = 100/(corners-1)
    let core = 7
    let sx = 100
    let sy = 100
    for (let i=0; i < corners; i++) {
      
      if ((i != 0) & (sx != 0) & (sx - x_step > 0) & (i<corners-1)) {
          // console.log(sx, sy)
          sx = sx - x_step
          if (i%2==0) {

            sy = sy + randInt(20, 21) * (1-sy/100)
          } else {

            sy = sy - randInt(30,35) * (sy/100)
          }
        
      } 
      else if ((sx - x_step) < 0 || (i>=corners-1)) {
        
        // console.log("going to ending", i)
        sx = 0
        
        if (i%2==0) {
          sy = sy - randInt(10, 15)
        } 
        
        else {
          sy = sy + randInt(10, 15)
        }
        
        lc = lc + `0% ${sy}%, 0% 100%`
        left.style = `clip-path: polygon(${lc});`
      }
      lc = lc + `${sx}% ${sy}%,`
    }
     lc = ""
    console.log("ended started new")
    sx = 0
    sy = 100
    for (let i=0; i < corners; i++) {
      
      if ((i != 0) & (sx != 100) & (sx + x_step < 100) & (i<corners-1)) {
          console.log(sx, sy)
          sx = sx + x_step
          if (i%2==0) {

            sy = sy + randInt(5, 10) * (1-sy/100)
          } else {

            sy = sy - randInt(10,15) * (sy/100)
          }
        
      } 
      else if (((sx + x_step) > 100) || (i>=corners-1)){
        
        sx = 0
        
        if (i%2==0) {
          sy = sy - randInt(10, 15)
        } 
        
        else {
          sy = sy + randInt(10, 15)
        }
        console.log("i am here")
        lc = lc + `100% ${sy}%, 100% 100%`
        console.log(lc)
        right.style = `clip-path: polygon(${lc});`
      }
      lc = lc + `${sx}% ${sy}%,`
    }
    
  }
 
  
  
  genBuild() {
    let sbCount = randInt(15, 20)
    let mbCount = randInt(10, 12)
    let bbCount = randInt(4, 7)
    for (let i=0; i<bbCount; i++) {
      let up = document.createElement("span")
      up.classList.add("up")
      let bb = document.createElement("span")
      bb.classList.add("build")
      bb.classList.add("bb")
      bb.appendChild(up)
      let h = randInt(10, 14);
      let op = (1-((14-h)/4)+0.4)*100
      let zi = op/10+4
      bb.style=`height: ${h}vh; width: ${randInt(2, 3)}vh; transform: translateX(${(60/bbCount)*i+randInt(-2, 4)}vh); opacity: ${op}%; z-index: ${zi}`
      this.buildWrap.appendChild(bb)
    }
    for (let i=0; i<sbCount; i++) {
      let sb = document.createElement("span")
      sb.classList.add("build")
      sb.classList.add("sb")
      let h = randInt(3, 5);
      let op = (1-((5-h)/2)+0.4)*100
      let zi = op/10+4
      sb.style=`height: ${h}vh; width: ${randInt(3, 4)}vh; transform: translateX(${(58/sbCount)*i+randInt(-2, 4)}vh); opacity: ${op}%; z-index: ${zi}`
      this.buildWrap.appendChild(sb)
    }
    for (let i=0; i<mbCount; i++) {
      let mb = document.createElement("span")
      mb.classList.add("build")
      mb.classList.add("mb")
      let h = randInt(5, 12);
      let op = (1-((12-h)/7)+0.4)*100
      let zi = op/10+4
      mb.style=`height: ${h}vh; width: ${randInt(1, 3)}vh; transform: translateX(${(60/mbCount)*i+randInt(-2, 4)}vh); opacity: ${op}%; z-index: ${zi}`
      this.buildWrap.appendChild(mb)
    }
  }
  
  genStars() {
    let starCount = randInt(20, 40)
    for (let i=0; i<starCount; i++) {
      // console.log(i)
      let star = document.createElement("span")
      star.classList.add("star")
      let size = randInt(1, 5)
      let px = randInt(0, 100)
      let py = randInt(0, 100)
      let op = randInt(70, 100)
      star.style=`height: ${size}px; width: ${size}px; top: ${px}%; left: ${py}%; opacity: ${op};`
      
      this.starWrap.appendChild(star)
    }
  }
}

var a = new retro()
let audio = new Audio("sound.mp3");

let sun = document.querySelector(".retro .sun")
sun.addEventListener("click", function (e) {
    
    let html = document.querySelector("html")
    let gl = document.querySelector(".retro .glines")
    if (html.classList.contains("grey-filter")) {
        html.classList.remove("grey-filter")
        gl.style = "animation: guideLines 0.5s linear infinite;"
        audio.play()
    } else {
        html.classList.add("grey-filter")
        gl.style = "animation: guideLines 2s linear infinite;"
        audio.pause()
    }
});

