Vue.component('Fish', {
    data() {
        return {
            isCaught: false
        }
    },
    methods: {
        caugth() {
            if(this.isCaught) return;
            this.isCaught = true;
            setTimeout(() => {
                this.isCaught = false;
            }, 3000);
            app.totalCorn++;
            console.log(app.totalCorn)
        }
    },
    template: `
    <transition name="fishHide">
      <div v-if="!isCaught" @click="caugth"></div>
    </transition>
    `
})

let app = new Vue({
    el: '#app',
    data: {
        firstPlayer: 'Игрок 1',
        showSignUp: true,
        error: false,
        fishes: [1],
        totalCorn: 0,
        showEndGame: false,
        i: 2,
        time: 61,
        records: []
    },
    methods: {
        signUp() {
            this.firstPlayer ? this.showSignUp = false : this.error = true;
            this.setFish();
            this.startGame();
        },
        setFish() {
            if (this.fishes.length === 8) return;
            this.fishes.push(this.i);
            this.i++;
            setTimeout(this.setFish, 1000);
        },
        restartGame() {
            this.showEndGame = false;
            this.totalCorn = 0;
            this.fishes = [1];
            this.time = 61;
            this.startGame();
            this.setFish();
        },
        startGame() {
            this.time--;
            if (!this.time) {
                this.showEndGame = true;
                return;
            }
            setTimeout(this.startGame, 1000);
        },
        checkRecords() {
            console.log(this.totalCorn)
            if(this.records.length < 10)
                this.records.push(this.totalCorn);
            else {
                let min=0;
                for(let i=0;i < 10; i++) {
                    if(this.records[i]< this.records[min])
                        min=i;
                }
                this.records.splice(min,1,this.totalCorn);
            }
        }
    },
    watch: {
        showEndGame() {
            if(this.showEndGame) this.checkRecords();
        }
    }
})
