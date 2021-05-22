let game = { 

    lockMode: false,
    firstCard: null,
    secondCard: null,

games: ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'],

  cards: null,

    setCard: function (id) {
      
        let card = this.cards.filter(card => card.id === id) [0];
        console.log(card);
        if(card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function() {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },


createCardsFromGames: function() {

    this.cards = [];

    this.games.forEach((game) => {
        this.cards.push(this.createPairFromGame(game));
    })

    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
    },



    createPairFromGame: function(game){
    
        return [{
            id: this.createIdWithgame(game),
            icon: game,
            flipped: false,
        },{
            id: this.createIdWithgame(game),
            icon: game,
            flipped: false,
        }]
    },
    
    createIdWithgame: function(game){
        return game + parseInt(Math.random() * 1000);
    },

    shuffleCards:function(cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
    
        while (currentIndex !== 0 ) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
    
}