function searchPatients() {
    fetch('http://localhost:8000/getPatients')
    .then(resp => resp.json()).then(data => console.log(data))
    .catch(err => console.log(err))
}

function searchMedics() {
    fetch('http://localhost:8000/getMedics')
    .then(resp => resp.json()).then(data => console.log(data))
    .catch(err => console.log(err))
}

function searchApp() {
    fetch('http://localhost:8000/getAppointments')
    .then(resp => resp.json()).then(data => console.log(data))
    .catch(err => console.log(err))
}