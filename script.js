new Vue({
    el: "#game",
    data: {
        mainShow: true,
        startStopGame: false,
        wounded: false,
        woundList: [{
            you: 0,
            enemy: 0
        }],
        yourHealth: 100,
        enemyHealth: 100,
        aidShow: false
    },
    methods: {
        attack: function () {

            this.woundList.you = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
            this.woundList.enemy = Math.floor(Math.random() * (15 - 5 + 1)) + 5;

            this.winner();
            this.wounded = true;
        },
        specialAttack: function () {

            this.woundList.you = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
            this.woundList.enemy = Math.floor(Math.random() * (25 - 12 + 1)) + 12;

            this.winner();
            this.wounded = true;
        },
        aid: function () {

            this.aidPoint = Math.floor(Math.random() * (20 - 7 + 1)) + 7;
            this.woundList.enemy = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

            if (this.yourHealth > 0 && this.yourHealth < 100
                && this.enemyHealth > 0 && this.enemyHealth <= 100) {
                this.wounded = true;
                this.aidShow = true;
                this.yourHealth = this.yourHealth + this.aidPoint - this.woundList.enemy;

                if (this.yourHealth >= 100) {
                    this.yourHealth = 100;
                } else if (this.yourHealth <= 0) {
                    this.yourHealth = 0;
                    setTimeout(() => {
                        if (confirm("Oyun bitdi.. Məğlub oldunuz. Yenidən oynamaq istəyirsinizmi..?")) {
                            this.playAgain();
                        } else {
                            this.mainShow = false;
                        }
                    }, 600);
                }

            } else if (this.yourHealth >= 100) {
                alert("Canınız tamdır. Yalnızca canınız tam olmadığı zaman yardım ala bilərsiniz..")
            }
        },
        surrender: function () {

            setTimeout(() => {
                if (confirm("Oyun bitdi.. Məğlub oldunuz. Yenidən oynamaq istəyirsinizmi..?")) {
                    this.playAgain();
                } else {
                    this.mainShow = false;
                }
            }, 600);
        },
        playAgain: function () {
            this.mainShow = true;
            this.startStopGame = false;
            this.wounded = false;
            this.aidShow = false;

            this.yourHealth = 100;
            this.enemyHealth = 100;
        },
        winner: function () {
            if (this.yourHealth > 0 && this.enemyHealth > 0) {
                this.yourHealth -= this.woundList.you;
                this.enemyHealth -= this.woundList.enemy;
                this.aidShow = false;

                if (this.yourHealth <= 0) {
                    this.yourHealth = 0;
                    if (this.enemyHealth <= 0) {
                        this.enemyHealth = 0;
                        setTimeout(() => {
                            if (confirm("Oyun bitdi.. Qazanan məlum olmadı. Yenidən oynamaq istəyirsinizmi..?")) {
                                this.playAgain();
                            } else {
                                this.mainShow = false;
                            }
                        }, 600);
                    } else {
                        setTimeout(() => {
                            if (confirm("Oyun bitdi.. Məğlub oldunuz. Yenidən oynamaq istəyirsinizmi..?")) {
                                this.playAgain();
                            } else {
                                this.mainShow = false;
                            }
                        }, 600);
                    }

                } else if (this.enemyHealth <= 0) {
                    this.enemyHealth = 0;
                    if (this.yourHealth <= 0) {
                        this.yourHealth = 0;
                        setTimeout(() => {
                            if (confirm("Oyun bitdi.. Qazanan məlum olmadı. Yenidən oynamaq istəyirsinizmi..?")) {
                                this.playAgain();
                            } else {
                                this.mainShow = false;
                            }
                        }, 600);
                    } else {
                        setTimeout(() => {
                            if (confirm("Təbrik edirik. Qalib gəldiniz. Yenidən oynamaq istəyirsinizmi..?")) {
                                this.playAgain();
                            } else {
                                this.mainShow = false;
                            }
                        }, 600);
                    }
                }
            }
        }
    },
    computed: {
        yourHealthWidth: function () {
            return {
                width: this.yourHealth + "%"
            }
        },
        enemyHealthWidth: function () {
            return {
                width: this.enemyHealth + "%"
            }
        }
    }
})