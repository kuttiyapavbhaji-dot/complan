const complaintForm = document.getElementById("complaintForm");
const complaintsList = document.getElementById("complaintsList");
const complaintCount = document.getElementById("complaintCount");
const successMessage = document.getElementById("successMessage");


// Load saved complaints
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];


// Save complaints to the browser
function saveComplaints() {
    localStorage.setItem("complaints", JSON.stringify(complaints));
}


// Display complaints
function displayComplaints() {

    complaintCount.textContent =
        `${complaints.length} complaint${complaints.length === 1 ? "" : "s"}`;

    if (complaints.length === 0) {

        complaintsList.innerHTML = `
            <div class="empty-state">
                <div>🕊️</div>
                <p>No complaints yet.</p>
                <small>
                    wow good job hai ye to mera crazy
                </small>
            </div>
        `;

        return;
    }


    complaintsList.innerHTML = "";


    complaints.forEach((complaint, index) => {

        const complaintCard = document.createElement("div");

        complaintCard.style.background = "#fff7f9";
        complaintCard.style.padding = "20px";
        complaintCard.style.borderRadius = "15px";
        complaintCard.style.marginBottom = "15px";
        complaintCard.style.border = "1px solid #f0dce1";


        complaintCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; gap:10px; margin-bottom:10px;">
                <strong>${escapeHTML(complaint.title)}</strong>

                <span style="
                    background:${complaint.severity === "Major" ? "#ffe0e0" : "#e9f8ed"};
                    color:${complaint.severity === "Major" ? "#c0392b" : "#29904c"};
                    padding:5px 10px;
                    border-radius:15px;
                    font-size:12px;
                    font-weight:bold;
                ">
                    ${escapeHTML(complaint.severity)}
                </span>
            </div>

            <p style="font-size:13px; color:#d94f70; margin-bottom:8px;">
                ${escapeHTML(complaint.category)}
            </p>

            <p style="line-height:1.5; margin-bottom:12px;">
                ${escapeHTML(complaint.description)}
            </p>

            <small style="color:#99888c;">
                ${escapeHTML(complaint.date)}
            </small>

            <button
                onclick="deleteComplaint(${index})"
                style="
                    margin-top:15px;
                    padding:8px 12px;
                    background:#eee;
                    color:#555;
                    font-size:12px;
                "
            >
                Delete
            </button>
        `;


        complaintsList.appendChild(complaintCard);
    });
}


// Submit complaint
complaintForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const severity = document.getElementById("severity").value;


    const complaint = {

        category: category,

        title: title,

        description: description,

        severity: severity,

        date: new Date().toLocaleString()
    };


    complaints.push(complaint);

    saveComplaints();

    displayComplaints();


    // Show fake notification
    successMessage.classList.remove("hidden");


    // Scroll to notification
    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    // Reset form
    complaintForm.reset();


    // Hide notification after 6 seconds
    setTimeout(() => {

        successMessage.classList.add("hidden");

    }, 6000);

});


// Delete a complaint
function deleteComplaint(index) {

    if (confirm("Delete this complaint?")) {

        complaints.splice(index, 1);

        saveComplaints();

        displayComplaints();
    }
}


// Protect the page from HTML being entered into complaints
function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// Display saved complaints when the page loads
displayComplaints();
