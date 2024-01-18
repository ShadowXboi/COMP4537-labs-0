class MemoryGame {
    constructor() {
        this.originalOrder = [];
        this.currentOrder = [];
        this.numberOfButtons = 0;
        this.buttonsContainer = document.getElementById("buttons-container");
    }

    createButtons() {
        this.clearButtons();
        this.originalOrder = [];
        this.currentOrder = [];

        this.numberOfButtons = parseInt(document.getElementById("numberOfButtons").value);

        if (this.validateInput()) {
            this.generateButtons();
            this.pauseAndScramble();
        } else {
            alert("Please enter a valid input between 3 and 7");
        }
    }

    validateInput() {
        return this.numberOfButtons >= 3 && this.numberOfButtons <= 7;
    }

    generateButtons() {
        for (let i = 0; i < this.numberOfButtons; i++) {
            let button = document.createElement("button");
            button.style.backgroundColor = this.getRandomColor();
            button.innerText = "Button " + (i + 1);
            this.originalOrder.push(i + 1);
            this.buttonsContainer.appendChild(button);
        }
    }

    pauseAndScramble() {
        setTimeout(() => {
            for (let i = 0; i < this.numberOfButtons; i++) {
                setTimeout(() => {
                    this.scrambleButtons();
                }, i * 2000);
            }

            setTimeout(() => {
                this.hideNumbersAndMakeClickable();
            }, this.numberOfButtons * 2000);
        }, this.numberOfButtons * 1000);
    }

    getRandomColor() {
        // ... (unchanged)
    }

    scrambleButtons() {
        let buttons = Array.from(this.buttonsContainer.children);

        buttons.forEach(button => {
            let x = Math.random() * (window.innerWidth - button.offsetWidth);
            let y = Math.random() * (window.innerHeight - button.offsetHeight);

            button.style.position = 'absolute';
            button.style.left = x + 'px';
            button.style.top = y + 'px';
        });
    }

    hideNumbersAndMakeClickable() {
        let buttons = this.buttonsContainer.children;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = "";
            buttons[i].onclick = () => this.handleButtonClick(i + 1);
        }
    }

    handleButtonClick(buttonNumber) {
        this.currentOrder.push(buttonNumber);

        document.getElementById("buttons-container").children[buttonNumber - 1].innerText = buttonNumber;

        if (this.arraysEqual(this.originalOrder, this.currentOrder)) {
            alert("Excellent Memory");
            this.resetGame();
        } else if (this.currentOrder.length === this.originalOrder.length && !this.arraysEqual(this.originalOrder, this.currentOrder)) {
            alert("Wrong Order");
            this.revealCorrectOrder();
            this.resetGame();
        }
    }

    arraysEqual(arr1, arr2) {
        return JSON.stringify(arr1) === JSON.stringify(arr2);
    }

    revealCorrectOrder() {
        let buttons = this.buttonsContainer.children;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = this.originalOrder[i];
        }
    }

    resetGame() {
        this.originalOrder = [];
        this.currentOrder = [];
    }

    clearButtons() {
        this.buttonsContainer.innerHTML = "";
    }
    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

// Usage
let memoryGame = new MemoryGame();
