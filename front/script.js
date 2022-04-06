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

function postMed() {
    //name, email, phone, registration_date
    const options = {
        method: 'POST',
        body: JSON.stringify({table: 'medics', values: ['Daniela Discombe', 'ddiscombe4@fda.gov', '2977834771', '14/07/2021']})
    }

    fetch("http://localhost:8000/postForms", options)
    .then( data => console.log(data))
    .catch( err => console.log(err))
}