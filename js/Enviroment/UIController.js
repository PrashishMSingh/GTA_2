class UIController{
    constructor(player, healthBar, sprintBar, pursuitBar, moneyBar){
        this.player = player
        this.healthBar = healthBar
        this.sprintBar = sprintBar
        this.pursuitBar = pursuitBar
        this.moneyBar = moneyBar
    }

    showPlayersHeart=() =>{
        this.healthBar.innerHTML = ''
        let ul = document.createElement('ul');
        for(var i = 0; i < this.player.state.health; i++){
            let li = document.createElement('li')
            let heartIcon = document.createElement('i')
            heartIcon.setAttribute('class', 'fas fa-heart');
            heartIcon.style.color = 'red'
            li.appendChild(heartIcon)
            ul.appendChild(li)
        }
        this.healthBar.appendChild(ul)
    }

    showPlayerStamina = () =>{
        this.sprintBar.innerHTML = ''
        let ul = document.createElement('ul')
        for(var i =0; i <this.player.state.sprint; i++){
            let li = document.createElement('li')
            let sprintIcon = document.createElement('i')
            sprintIcon.setAttribute('class', 'fas fa-bolt')
            sprintIcon.style.color = '#3498DB'
            li.appendChild(sprintIcon)
            ul.appendChild(li)
        }
        this.sprintBar.appendChild(ul)
    }

    showPursuitStar = () =>{
        this.pursuitBar.innerHTML = ''
        let startUl = document.createElement('ul')
        for(var i = 0; i< this.player.state.pursuit; i++){
            let li = document.createElement('li')
            let icon = document.createElement('i')
            icon.setAttribute('class', 'fas fa-star')
            icon.style.color = '#F5D106'
            li.appendChild(icon)
            startUl.appendChild(li)
        }
        this.pursuitBar.appendChild(startUl)
    }

    showPlayerBalance = () =>{
        this.moneyBar.innerText = this.player.state.money
    }

}