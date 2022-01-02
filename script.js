let stars = {
    randomColorLevel() {
        return parseInt(200 + (Math.random()*55))
    },
    randomRadius: function(){return parseInt(1 + (Math.random()*3))},
    randomPosition(from, over) {
        return new Vector(from.X+(over.X * Math.random()), from.Y + (over.Y * Math.random()))
    }
}

document.addEventListener('DOMContentLoaded', () => {
    backgroundStars = document.querySelector('#background-stars')
    let density = (1 + Math.random()) / 4000
    let starsFilledRange = new Vector(0, 0)
    addStarsRange()
    starsFilledRange = new Vector(innerWidth/2, innerWidth/2)
    function addStarsRange() {
        // stars per pixel
        let density = (Math.random() + 1) / 4000
        let leap = new Vector(innerWidth/2, innerHeight/2)
        leap.sub(starsFilledRange)
        leap.add(new Vector(100, 100))
        addStarsRect(starsFilledRange.plus(leap).reverse(), starsFilledRange.reverseY().Xplus(leap))
        addStarsRect(starsFilledRange.plus(leap).reverseX(), starsFilledRange.Xplus(leap))
        addStarsRect(starsFilledRange.Xplus(leap).reverseX(), starsFilledRange.reverse())
        addStarsRect(starsFilledRange.reverseY(), starsFilledRange.Xplus(leap))
        starsFilledRange.add(leap)
    }
    window.onresize = () => {
        console.log('resized check')
        if ((innerWidth > starsFilledRange.X * 2) || (innerHeight > starsFilledRange.Y * 2)) {
            console.log('resized')
            addStarsRange()
        }
    }
    function addStarsRect(from, to) {
        over = to.minus(from)
        for (let i = 0; i < from.areaTo(to) * density; i++) {
            let star = document.createElement('div')
            star.setAttribute('role', 'presentation')
            star.classList.add('background-star')
            let position = stars.randomPosition(from, over)
            star.style.marginLeft = `${position.X}px`
            star.style.marginTop = `${position.Y}px`
            star.style.backgroundColor = `rgb(${stars.randomColorLevel()}, ${stars.randomColorLevel()}, ${stars.randomColorLevel()})`
            let radius = stars.randomRadius()
            star.style.width = `${radius}px`
            star.style.height = `${radius}px`
            star.style.borderRadius = '50%'
            backgroundStars.appendChild(star)
        }
    }
})

class Vector {
    constructor(ix, iy) {
        this.X = ix
        this.Y = iy
    }
    add(a) {
        this.X += a.X
        this.Y += a.Y
    }
    plus(a) {
        return new Vector(this.X + a.X, this.Y + a.Y)
    }
    Xplus(a) {
        return new Vector(this.X + a.X, this.Y)
    }
    Yplus(a) {
        return new Vector(this.X, this.Y + a.Y)
    }
    sub(a) {
        this.X -= a.X
        this.Y -= a.Y
    }
    minus(a) {
        return new Vector(this.X - a.X, this.Y - a.Y)
    }
    areaTo(a) {
        return Math.abs(this.X - a.X) * Math.abs(this.Y - a.Y)
    }
    reverse() {
        return new Vector(-this.X, -this.Y)
    }
    reverseX() {
        return new Vector(-this.X, this.Y)
    }
    reverseY() {
        return new Vector(this.X, -this.Y)
    }
}