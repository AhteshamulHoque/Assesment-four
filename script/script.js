document.addEventListener("DOMContentLoaded", function () {
    let totalEl = document.getElementById("total");
    let interviewEl = document.getElementById("interview");
    let rejectedEl = document.getElementById("rejected");
    let requiredJobEl = document.getElementById("required-job");
    let allCardsContainer = document.getElementById("allcards");

    let filterButtons = document.querySelectorAll("section.space-y-3 button");
    let btnAll = filterButtons[0];
    let btnInterviewTab = filterButtons[1];
    let btnRejectedTab = filterButtons[2];

    function updateDashboard() {
        let cards = allCardsContainer.children; 
        let total = cards.length;
        let interviewCount = 0;
        let rejectedCount = 0;

        for (let i = 0; i < cards.length; i++) {
            let status = cards[i].getAttribute("data-status");
            if (status === "Interview") {
                interviewCount = interviewCount + 1;
            } else if (status === "Rejected") {
                rejectedCount = rejectedCount + 1;
            }
        }

        totalEl.textContent = total;
        interviewEl.textContent = interviewCount;
        rejectedEl.textContent = rejectedCount;
        requiredJobEl.textContent = total + " jobs";
    }

    function filterCards(status) {
        let cards = allCardsContainer.children;
        for (let i = 0; i < cards.length; i++) {
            let cardStatus = cards[i].getAttribute("data-status");
            
            if (status === "All") {
                cards[i].style.display = "block";
            } else if (cardStatus === status) {
                cards[i].style.display = "block";
            } else {
                cards[i].style.display = "none";
            }
        }
    }

    function setupCardEvents(card) {
        card.setAttribute("data-status", "Not Applied");

        let interviewBtn = card.querySelector(".btn-success");
        let rejectedBtn = card.querySelector(".btn-error");
        let deleteBtn = card.querySelector(".fa-trash-can").parentElement;
        let badge = card.querySelector(".status-badge");

        interviewBtn.addEventListener("click", function() {
            card.setAttribute("data-status", "Interview");
            badge.textContent = "INTERVIEW";
            badge.className = "status-badge inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-md mb-4";
            updateDashboard();
        });

        rejectedBtn.addEventListener("click", function() {
            card.setAttribute("data-status", "Rejected");
            badge.textContent = "REJECTED";
            badge.className = "status-badge inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-md mb-4";
            updateDashboard();
        });

        deleteBtn.addEventListener("click", function() {
            card.remove();
            updateDashboard();
        });
    }

    let initialCards = allCardsContainer.children;
    for (let j = 0; j < initialCards.length; j++) {
        setupCardEvents(initialCards[j]);
    }

    btnAll.addEventListener("click", function() {
        filterCards("All");
    });
    btnInterviewTab.addEventListener("click", function() {
        filterCards("Interview");
    });
    btnRejectedTab.addEventListener("click", function() {
        filterCards("Rejected");
    });
    
    updateDashboard();
});