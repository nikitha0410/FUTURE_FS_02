const API = "http://localhost:5000";

fetchLeads();
async function fetchLeads() {

  const res = await fetch(`${API}/leads`);

  const leads = await res.json();

  displayLeads(leads);
}
async function addLead() {

  const name =
    document.getElementById("name").value;

  const email =
    document.getElementById("email").value;

  const status =
    document.getElementById("status").value;

  const notes =
    document.getElementById("notes").value;


  if(name === "" || email === "") {

    alert("Please fill all fields");

    return;
  }
  await fetch(`${API}/addLead`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      name,
      email,
      status,
      notes
    })
  });

  clearForm();

  fetchLeads();
}

function displayLeads(leads) {

  const container =
    document.getElementById("leadsContainer");

  container.innerHTML = "";

  leads.forEach((lead) => {

    container.innerHTML += `

      <div class="lead-card">

        <h3>${lead.name}</h3>

        <p><strong>Email:</strong> ${lead.email}</p>

        <p><strong>Status:</strong> ${lead.status}</p>

        <p><strong>Notes:</strong> ${lead.notes}</p>

        <div class="actions">

          <button onclick="updateStatus('${lead._id}')">
            Change Status
          </button>

          <button
            class="delete-btn"
            onclick="deleteLead('${lead._id}')"
          >
            Delete
          </button>

        </div>

      </div>
    `;
  });
}

async function deleteLead(id) {

  await fetch(`${API}/deleteLead/${id}`, {

    method: "DELETE"

  });

  fetchLeads();
}

async function updateStatus(id) {

  await fetch(`${API}/updateStatus/${id}`, {

    method: "PUT"

  });

  fetchLeads();
}

function clearForm() {

  document.getElementById("name").value = "";

  document.getElementById("email").value = "";

  document.getElementById("notes").value = "";

}