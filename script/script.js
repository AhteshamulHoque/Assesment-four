  document.addEventListener("DOMContentLoaded", function () {
    const allCards = document.querySelectorAll("#allcards > div");

    const totalElement = document.getElementById("total");

    totalElement.textContent = allCards.length;
  });
  // Dashboard elements
const totalEl = document.getElementById("total");
const interviewEl = document.getElementById("interview");
const rejectedEl = document.getElementById("rejected");
const requiredJobEl = document.getElementById("required-job");

// All cards
const allCards = document.querySelectorAll("#allcards > div");

function updateDashboard() {
    let total = 0, interview = 0, rejected = 0;
    allCards.forEach(card => {
        if (!card.classList.contains("deleted")) {
            total++;
            const status = card.getAttribute("data-status");
            if (status === "Interview") interview++;
            else if (status === "Rejected") rejected++;
        }
    });
    totalEl.textContent = total;
    interviewEl.textContent = interview;
    rejectedEl.textContent = rejected;
    requiredJobEl.textContent = `${total} jobs`;
}

allCards.forEach(card => {
    card.setAttribute("data-status", "Not Applied");

    const interviewBtn = card.querySelector(".btn-success");
    const rejectedBtn = card.querySelector(".btn-error");
    const deleteBtn = card.querySelector(".fa-trash-can").parentElement;
    const badge = card.querySelector(".status-badge");

    interviewBtn.addEventListener("click", () => {
        card.setAttribute("data-status", "Interview");
        badge.textContent = "INTERVIEW";
        badge.className = "status-badge inline-block bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-md mb-4";
        updateDashboard();
    });

    rejectedBtn.addEventListener("click", () => {
        card.setAttribute("data-status", "Rejected");
        badge.textContent = "REJECTED";
        badge.className = "status-badge inline-block bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-md mb-4";
        updateDashboard();
    });

    deleteBtn.addEventListener("click", () => {
        card.classList.add("deleted");
        card.remove();
        updateDashboard();
    });
});


updateDashboard();