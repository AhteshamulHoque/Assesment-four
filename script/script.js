document.addEventListener("DOMContentLoaded", function () {
    let totalEl = document.getElementById("total");
    let interviewEl = document.getElementById("interview");
    let rejectedEl = document.getElementById("rejected");
    let requiredJobEl = document.getElementById("required-job");
    let allCardsContainer = document.getElementById("allcards");
    let noJobsMessage = document.getElementById("no-jobs-message");

    let filterButtons = document.querySelectorAll("section.space-y-3 button");
    let btnAll = filterButtons[0];
    let btnInterviewTab = filterButtons[1];
    let btnRejectedTab = filterButtons[2];
    let currentTab = "All";

    function updateDashboard() {
        let cards = allCardsContainer.children;
        let total = cards.length;
        let interviewCount = 0;
        let rejectedCount = 0;

        for (let i = 0; i < cards.length; i++) {
            let status = cards[i].getAttribute("data-status");
            if (status === "Interview") {
                interviewCount++;
            } else if (status === "Rejected") {
                rejectedCount++;
            }
        }

        totalEl.textContent = total;
        interviewEl.textContent = interviewCount;
        rejectedEl.textContent = rejectedCount;
        requiredJobEl.textContent = total + " jobs";
    }
    
function filterCards(status) {
    currentTab = status; 
    let cards = allCardsContainer.children;
    let visibleCount = 0;
    let totalCards = cards.length; 

    for (let i = 0; i < cards.length; i++) {
        let cardStatus = cards[i].getAttribute("data-status");
        let isVisible = (status === "All") || (cardStatus === status);

        if (isVisible) {
            cards[i].style.display = "block";
            visibleCount++;
        } else {
            cards[i].style.display = "none";
        }
    }

    if (status === "All") {
        requiredJobEl.textContent = totalCards + " jobs";
    } else {
        requiredJobEl.textContent = visibleCount + " of " + totalCards + " jobs";
    }

    if (visibleCount === 0) {
        noJobsMessage.classList.remove("hidden");
    } else {
        noJobsMessage.classList.add("hidden");
    }
}

    function setupCardEvents(card) {
        if (!card.getAttribute("data-status")) {
            card.setAttribute("data-status", "Not Applied");
        }

        let interviewBtn = card.querySelector(".btn-success");
        let rejectedBtn = card.querySelector(".btn-error");
        let deleteBtn = card.querySelector(".fa-trash-can").parentElement;
        let badge = card.querySelector(".status-badge");

        interviewBtn.addEventListener("click", function () {
            card.setAttribute("data-status", "Interview");
            badge.textContent = "INTERVIEW";
            badge.className = "status-badge inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-md mb-4";
            updateDashboard();
            filterCards(currentTab); 
        });

        rejectedBtn.addEventListener("click", function () {
            card.setAttribute("data-status", "Rejected");
            badge.textContent = "REJECTED";
            badge.className = "status-badge inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-md mb-4";
            updateDashboard();
            filterCards(currentTab);
        });

        deleteBtn.addEventListener("click", function () {
            card.remove();
            updateDashboard();
            filterCards(currentTab); 
        });
    }

    let initialCards = allCardsContainer.children;
    for (let j = 0; j < initialCards.length; j++) {
        setupCardEvents(initialCards[j]);
    }

    btnAll.addEventListener("click", function () {
        filterCards("All");
    });
    btnInterviewTab.addEventListener("click", function () {
        filterCards("Interview");
    });
    btnRejectedTab.addEventListener("click", function () {
        filterCards("Rejected");
    });

    updateDashboard();
    filterCards("All");
});