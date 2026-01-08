const cardsData = ['🚀', '🚀', '🎨', '🎨', '💻', '💻', '🎮', '🎮'];
const board = document.getElementById('game-board');
let flippedCards = [];
let matchedCount = 0;
let lockBoard = false; // Mencegah klik saat kartu sedang dicek

// 1. Fungsi Acak Kartu
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 2. Inisialisasi Game
function initGame() {
    const shuffledCards = shuffle(cardsData);
    
    shuffledCards.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        
        card.innerHTML = `
            <div class="front">${icon}</div>
            <div class="back">?</div>
        `;
        
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

// 3. Logika Membalik Kartu
function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// 4. Pengecekan Kecocokan
function checkMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        matchedCount += 2;
        resetTurn();
        if (matchedCount === cardsData.length) {
            setTimeout(() => alert('Hebat! Kamu menemukan semua pasangan!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    flippedCards = [];
    lockBoard = false;
}

initGame();