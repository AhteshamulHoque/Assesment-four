document.addEventListener("DOMContentLoaded", function () {
    const totalEl = document.getElementById("total");
    const interviewEl = document.getElementById("interview");
    const rejectedEl = document.getElementById("rejected");
    const requiredJobEl = document.getElementById("required-job");
    const allCardsContainer = document.getElementById("allcards");


    const filterButtons = document.querySelectorAll("section.space-y-3 button");
    const btnAll = filterButtons[0];
    const btnInterviewTab = filterButtons[1];
    const btnRejectedTab = filterButtons[2];

    function updateDashboard() {
        const cards = allCardsContainer.querySelectorAll(":scope > div");
        let total = cards.length;
        let interviewCount = 0;
        let rejectedCount = 0;

        cards.forEach(card => {
            const status = card.getAttribute("data-status");
            if (status === "Interview") interviewCount++;
            else if (status === "Rejected") rejectedCount++;
        });

        totalEl.textContent = total;
        interviewEl.textContent = interviewCount;
        rejectedEl.textContent = rejectedCount;
        requiredJobEl.textContent = `${total} jobs`;
    }


    function filterCards(status) {
        const cards = allCardsContainer.querySelectorAll(":scope > div");
        cards.forEach(card => {
            const cardStatus = card.getAttribute("data-status");
            if (status === "All") {
                card.style.display = "block";
            } else if (cardStatus === status) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }
    function setupCardEvents(card) {
        card.setAttribute("data-status", "Not Applied");
        const interviewBtn = card.querySelector(".btn-success");
        const rejectedBtn = card.querySelector(".btn-error");
        const deleteBtn = card.querySelector(".fa-trash-can").parentElement;
        const badge = card.querySelector(".status-badge");

        interviewBtn.addEventListener("click", () => {
            card.setAttribute("data-status", "Interview");
            badge.textContent = "INTERVIEW";
            badge.className = "status-badge inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-md mb-4";
            updateDashboard();
        });

        rejectedBtn.addEventListener("click", () => {
            card.setAttribute("data-status", "Rejected");
            badge.textContent = "REJECTED";
            badge.className = "status-badge inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-md mb-4";
            updateDashboard();
        });

        deleteBtn.addEventListener("click", () => {
            card.remove();
            updateDashboard();
        });
    }

 
    const initialCards = allCardsContainer.querySelectorAll(":scope > div");
    initialCards.forEach(card => setupCardEvents(card));

  
    btnAll.addEventListener("click", () => filterCards("All"));
    btnInterviewTab.addEventListener("click", () => filterCards("Interview"));
    btnRejectedTab.addEventListener("click", () => filterCards("Rejected"));

    updateDashboard();
});