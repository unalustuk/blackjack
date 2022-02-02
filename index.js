const suits = [ "hearts", "diamonds", "clubs", "spades" ];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let  dealersHand = []
let  playersHand = []
let dealersHandSum = 0
let playersHandSum = 0
let cash = 1000
let betTotal = 0
let hasBlackJack = false
let isAlive = false
let isClickStand = false
let hitClicked = false
let dealCheck = false
const dealerHandEl = document.getElementById("dealerHand-el")
const playerHandEl = document.getElementById("playerHand-el")
const dealerPointsEl = document.getElementById("dealerPoints-el")
const playerPointsEl = document.getElementById("playerPoints-el")
const dealEl = document.getElementById("deal-el")
const hitEl = document.getElementById("hit-el")
const standEl = document.getElementById("stand-el")
const betbtnEl = document.getElementById("betbtn-el")
const betTotalEl = document.getElementById("bet-el")
const cashEl = document.getElementById("cash-el")
const messageEl = document.getElementById("message-el")
const button1 = document.createElement("button")
const button2 = document.createElement("button")
let button1Click = false
let button2Click = false
let rand = 0

betTotalEl.textContent += betTotal
cashEl.textContent += cash
let deck = getDeck()
shuffle(deck)

//create deck
function getDeck(){
	let deck = new Array();
	for(let i = 0; i < suits.length; i++){
		for(let x = 0; x < values.length; x++){
			let card = {Value: values[x], Suit: suits[i]}
			deck.push(card)
		}
	}
	return deck;
}

//shuffle deck
function shuffle(deck){

	for (let i = 0; i < 1000; i++){
		let location1 = Math.floor((Math.random() * deck.length))
		let location2 = Math.floor((Math.random() * deck.length))
		let tmp = deck[location1];

		deck[location1] = deck[location2]
		deck[location2] = tmp
	}
}


//deal new game and start game
function deal(){

    if (betTotal === 0){
        messageEl.textContent ="Please make a bet."  //cant play without bet
    }else {
        dealCheck=true
        button1Click = false
        button2Click = false
        dealersHand = []
        playersHand = []
        dealersHandSum = 0
        playersHandSum = 0
        isAlive = true
        hitClicked = false
        isClickStand = false
        hasBlackJack = false
        standEl.disabled = false
        hitEl.disabled = false
        dealEl.disabled = true
    
        dealNew()
        rand = Math.floor((Math.random() * 2))
    
        for(i = 0; i<2; i++){
            let card = deck.pop()
            playersHand.push(card)
            card = deck.pop()
            dealersHand.push(card)
        }
        // let card = {Value:"A", Suit: "hearts"}
        // playersHand.push(card)
        // card = {Value:"A", Suit: "hearts"}
        // playersHand.push(card)
    
        // card = {Value:"A", Suit: "hearts"}
        // dealersHand.push(card)
        // card = {Value:"A", Suit: "hearts"}
        // dealersHand.push(card)
        render()
        // console.log(deck)
        // console.log(playersHand,dealersHand)
    }
   
}

// if deck size lower than 20 create new deck
function dealNew(){
    dealEl.addEventListener("click",() =>{
        if (deck.length < 20){
            deck = getDeck()
            shuffle(deck)
            // console.log("getting new")
            // console.log(deck)

    }
       
    })  
}

//hit 
function hit(){
    if (isAlive && hasBlackJack === false) {
        card = deck.pop()
        playersHand.push(card)
        hitClicked = true
        // console.log(deck)
        // console.log(playersHand,dealersHand)
    }
    // card = {Value:"A", Suit: "hearts"}
    // playersHand.push(card)
    render()
    
}

//stand
function stand() {
    while (dealersHandSum < 17) {
        card = deck.pop()
        dealersHand.push(card)
        // card = {Value:"A", Suit: "hearts"}
        // dealersHand.push(card)
        
        updatePoints()

        if (dealersHandSum>=17) {            
            break;
        } 
    }
    isClickStand = true
    render()
}

function render(){
    if (!isButton1or2Clicked){
        value2A()
    }
    updatePoints()
    if (playersHandSum > 21){
        isAlive = false
    }else if (playersHandSum === 21){
        hitEl.disabled = true
        hasBlackJack=true
        messageEl.textContent = "Blackjack!"
    }
    renderStats()
    // console.log(playersHandSum)
    
    
    if(isAlive === false || isClickStand === true){
        winCheck()
    }
   
    // console.log(isAlive)
}

function updatePoints(){
    playersHandSum = 0
    dealersHandSum = 0
    if(playersHand[0].Value === "A" && playersHand[1].Value === "A"){
        if (button1Click){
            playersHandSum = 2
            for (let i = 2; i < playersHand.length; i++){
                playersHandSum += convert(playersHand[i].Value)
            }
        }else if (button2Click){
            playersHandSum = 12
            for (let i = 2; i < playersHand.length; i++){
                playersHandSum += convert(playersHand[i].Value)
            }
        }
    }else {
        for (let i = 0; i < playersHand.length; i++){
            playersHandSum += convert(playersHand[i].Value)
        }
    }
     
    if(dealersHand[0].Value === "A" && dealersHand[1].Value === "A"){
        // console.log("rand: ",rand)
        if (rand === 0){
            dealersHandSum = 2
            for (let i = 2; i < dealersHand.length; i++){
                dealersHandSum += dealersConvert(dealersHand[i].Value)
            }
        }else if (rand === 1){
            dealersHandSum = 12
            for (let i = 2; i < dealersHand.length; i++){
                dealersHandSum += dealersConvert(dealersHand[i].Value)
            }
        }
    }else {
        for (let i = 0; i < dealersHand.length; i++){
            dealersHandSum += dealersConvert(dealersHand[i].Value)
        }
    }
    
    // console.log(playersHandSum+" "+dealersHandSum)
    
}

function convert (value) {
  if(value === "A"){
    if (hitClicked){
            return 1
        } else {
            return 11
        }
    }else if (value === "J" || value === "K" || value === "Q"){
        return 10
    }else{
        return parseInt(value)
    } 
}

function dealersConvert (value) {
    if(value === "A"){
              return 1
      }else if (value === "J" || value === "K" || value === "Q"){
          return 10
      }else{
          return parseInt(value)
      } 
  }

function renderStats () {
   if(!isButton1or2Clicked && playersHand[0].Value === "A" && playersHand[1].Value === "A"){
        playerHandEl.textContent = "Players Hand: "
        playerPointsEl.textContent = "Players Points: "
        
        for (let i = 0; i<playersHand.length;i++){
            playerHandEl.textContent += playersHand[i].Value + " "
        }
        playerPointsEl.textContent += "2/12"    
   }else {
        playerHandEl.textContent = "Players Hand: "
        playerPointsEl.textContent = "Players Points: "
        
        for (let i = 0; i<playersHand.length;i++){
            playerHandEl.textContent += playersHand[i].Value + " "
        }
        playerPointsEl.textContent += playersHandSum       
   }
  


   dealerHandEl.textContent = "Dealers Hand: "
   dealerPointsEl.textContent = "Dealers Points: "


     if (!isClickStand){
        dealerHandEl.textContent = "Dealers Hand: "
        dealerPointsEl.textContent = "Dealers Points: "
    
        dealerHandEl.textContent += dealersHand[0].Value + " "
        dealerPointsEl.textContent += dealersConvert(dealersHand[0].Value) 
    }else {
        dealerHandEl.textContent = "Dealers Hand: "
        dealerPointsEl.textContent = "Dealers Points: "

        for (let i = 0; i<dealersHand.length;i++){
            dealerHandEl.textContent+= dealersHand[i].Value + " "
        }
        dealerPointsEl.textContent += dealersHandSum
    }
    if (!isAlive){
        dealerHandEl.textContent = "Dealers Hand: "
        dealerPointsEl.textContent = "Dealers Points: "

        for (let i = 0; i<dealersHand.length;i++){
            dealerHandEl.textContent+= dealersHand[i].Value + " "
        }
        dealerPointsEl.textContent += dealersHandSum
    }

}

function winCheck(){
   
        if ((playersHandSum < 22 && dealersHandSum < playersHandSum) || (dealersHandSum > 21 && playersHandSum < 22)){
            // console.log("player win")
            messageEl.textContent =`Congratulations! You have won $ ${betTotal*2}`
            cash += betTotal*2
        }else if(playersHandSum > 21){
            // console.log("dealer win")
            messageEl.textContent =`Dealer Won! You have lost $ ${betTotal}`
        }else if(playersHandSum === dealersHandSum){
            console.log("PUSH!")
            messageEl.textContent =`PUSH! Bet refund $ ${betTotal}`
            cash += betTotal
        }else {
            // console.log("dealer win")
            messageEl.textContent =`Dealer Won! You have lost $ ${betTotal}`

        }
        dealEl.disabled= false
        hitEl.disabled = true 
        standEl.disabled = true

        cashEl.textContent = "Cash: $"
        betTotalEl.textContent = "Bet: $"
        cashEl.textContent += cash
        betTotal = 0
        betTotalEl.textContent += betTotal
        dealCheck=false
        
}

function value2A() {
    if( playersHand[0].Value ==="A" && playersHand[1].Value ==="A"){
        hitEl.disabled = true

        button1.textContent = 2
        button2.textContent = 12
        document.body.appendChild(button1)
        document.body.appendChild(button2)
    }
    act()
    
}

let isButton1or2Clicked = false
function act() {     
   
    button1.addEventListener("click",()=>{
        button1Click=true
        button1.remove()
        button2.remove()
        hitEl.disabled = false
        isButton1or2Clicked = true
        render()

        
    })
    button2.addEventListener("click",()=>{
        button2Click=true
        button1.remove()
        button2.remove()
        hitEl.disabled = false
        isButton1or2Clicked = true
        render()
    })
}


const btns = document.querySelectorAll('button[id^=betbtn-el]')

btns.forEach(btn => {
   btn.addEventListener('click', event => {
        betAmount = event.target.textContent 
        bet(btn)
   })
})

function bet(e){
    // console.log(betAmount)
    if(dealCheck){
        betAmount = 0
    }else if(betAmount ==="$ALL"){
        betAmount = cash
    }else {
        betAmount=parseInt(betAmount.substr(1,4))
    }

    if (dealCheck){

    }else{
        if(e.textContent === "RESET BET"){
            cash += betTotal
            betTotal = 0
            betAmount = 0
        }else if (betAmount > cash){
           
        }else if(cash === 0) {
           
        }else {
            betTotal += betAmount
            cash -= betAmount  
        }
    }
  
    
        cashEl.textContent = "Cash: $"
        betTotalEl.textContent = "Bet: $"
        cashEl.textContent += cash
        betTotalEl.textContent += betTotal
        // console.log(cash,betTotal, betAmount)
        betAmount=0
}

