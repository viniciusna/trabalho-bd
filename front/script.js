function searchPatients() {
  fetch("http://localhost:8000/getPatients")
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function searchMedics() {
  fetch("http://localhost:8000/getMedics")
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function searchApp() {
  fetch("http://localhost:8000/getAppointments")
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function postPat() {
  //name, age, email, cep, address, house_number, phone, id_last_appointments, last_update
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      table: "patients",
      values: [1, "Stace", 26, "sdomini1@smugmug.com", "881", "42862 Merry Way", 41, "4263706274", 0, "20/05/2021", "07/04/2021"],
    }),
  };

  fetch("http://localhost:8000/postForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function postMed() {
  //name, email, phone, registration_date
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "medics", values: [2, "Daniela Discombe", "ddiscombe4@fda.gov", "2977834771", "14/07/2021"] }),
  };

  fetch("http://localhost:8000/postForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function postApp() {
  //name, email, phone, registration_date
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "appointments", values: [1, 1, 1, "14/07/2021", "2:29 AM", "2:30 AM", "36.56", "Turquoise"] }),
  };

  fetch("http://localhost:8000/postForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function putPat() {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "patients", values: [1, "Daniela", 22, "ddiscombe4@fda.gov", "890", "rua lacombe", 34, "4263706274", "14/07/2021"] }),
  };

  fetch("http://localhost:8000/putForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function putMed() {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "medics", values: [1, "Daniela", "ddiscombe4@fda.gov", "2977834771", "14/07/2021"] }),
  };

  fetch("http://localhost:8000/putForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function putApp() {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "appointments", values: [1, 2, 2, "14/07/2021", "2:29 AM", "2:30 AM", "36.56", "Turquoise"] }),
  };

  fetch("http://localhost:8000/putForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function deletePat() {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "patients", values: [1] }),
  };

  fetch("http://localhost:8000/deleteForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

function deleteApp() {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: "appointments", values: [1] }),
  };

  fetch("http://localhost:8000/deleteForms", options)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
