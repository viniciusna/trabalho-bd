const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const pkg = require("pg");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Pool } = pkg;

const config = {
  user: "postgres", //seu usuário
  database: "clinicalControl", //nome do banco de dados no seu postre aí
  password: "1978", //Coloca a senha do seu user do postres
  port: 5432,
};
const pool = new Pool(config);

app.use(express.static("front"));

app.get("/getMedics", function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }

    pool.query("SELECT * FROM public.medics ORDER BY id ASC", function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }

      let obj = result.rows;
      res.status(200).send(obj);
    });
  });
});

app.get("/getPatients", function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }

    pool.query("SELECT * FROM public.patients ORDER BY id ASC", function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }

      let obj = result.rows;
      res.status(200).send(obj);
    });
  });
});

app.get("/getAppointments", function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }

    pool.query("SELECT * FROM public.appointments ORDER BY id ASC", function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }

      let obj = result.rows;
      res.status(200).send(obj);
    });
  });
});

//objeto -> { table: 'nome da tabela', values: ['valores aqui, em ordem'] }
//exemplo -> { table: medics, values: [1, joao, joao@gg.com, 12345678, 30/05/2020, null] }

function defineInsertion(obj) {
  let query = { values: obj.values };

  if (obj.table === "appointments") {
    query.text = "INSERT INTO appointments VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
  } else if (obj.table === "medics") {
    query.text = "INSERT INTO medics VALUES ($1, $2, $3, $4, $5)";
  } else if (obj.table === "patients") {
    query.text = "INSERT INTO patients VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
  }

  return query;
}

function defineUpdate(obj) {
  let query = { values: obj.values };

  if (obj.table === "appointments") {
    query.text = "UPDATE appointments SET id_medic = $2, id_patient = $3, date = $4, time_init = $5, time_end = $6, price = $7, status = $8 WHERE id = $1";
  } else if (obj.table === "medics") {
    query.text = "UPDATE medics SET name = $2, email = $3, phone = $4, registration_date = $5 WHERE id = $1";
  } else if (obj.table === "patients") {
    query.text = "UPDATE patients SET name = $2, age = $3, email = $4, cep = $5, address = $6, house_number = $7, phone = $8, last_update = $9 WHERE id = $1";
  }

  return query;
}

function defineDelete(obj) {
  let query = { values: obj.values };

  if (obj.table === "appointments") {
    query.text = "DELETE FROM appointments WHERE id = $1";
  } else if (obj.table === "medics") {
    query.text = "DELETE FROM medics WHERE id = $1";
  } else if (obj.table === "patients") {
    query.text = "DELETE FROM patients WHERE id = $1";
  }

  return query;
}

app.post("/postForms", async function insertCustomer(req, res) {
  const query = defineInsertion(req.body);
  console.log(query);

  // const { name, email, phone } = req.body;
  // const query = {
  //     text: 'INSERT INTO public.forms(name, email, phone) VALUES($1, $2, $3)',
  //     values: [name, email, parseInt(phone)]
  // };

  try {
    await pool.query(query);
    res.status(200).send("Form inserted");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.put("/putForms", async function updateCustomer(req, res) {
  const query = defineUpdate(req.body);
  console.log(query);

  // const { id, name, email, phone } = req.body;
  // const query = {
  //     text: 'UPDATE public.forms SET name = $1, email = $2, phone = $3 WHERE id = $4',
  //     values: [name, email, parseInt(phone), id]
  // };

  try {
    await pool.query(query);
    res.status(200).send("Form updated");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.delete("/deleteForms", async function deleteCustomer(req, res) {
  const query = defineDelete(req.body);
  console.log(query);

  // const { name, email, phone } = req.body;
  // const query = {
  //     text: 'INSERT INTO public.forms(name, email, phone) VALUES($1, $2, $3)',
  //     values: [name, email, parseInt(phone)]
  // };

  try {
    await pool.query(query);
    res.status(200).send("Form deleted");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});
