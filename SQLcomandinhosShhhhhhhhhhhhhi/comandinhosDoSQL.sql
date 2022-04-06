CREATE DATABASE clinicalControl;

-- \c clinicalControl;

CREATE TABLE medics (
	id serial NOT NULL,
	name varchar(200) NOT NULL,
	email varchar(100) NOT NULL,
	phone varchar(11) NOT NULL,
	registration_date DATE NOT NULL,
	CONSTRAINT medics_pk PRIMARY KEY (id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE patients (
	id serial NOT NULL,
	name varchar(200) NOT NULL,
	age int NOT NULL,
	email varchar(50) NOT NULL,
	cep varchar(8) NOT NULL,
	address varchar(100) NOT NULL,
	house_number int NOT NULL,
	phone varchar(11) NOT NULL,
	id_last_appointments int,
	last_update DATE,
	deletion_date DATE,
	CONSTRAINT patients_pk PRIMARY KEY (id)
) WITH (
	OIDS=FALSE
);

CREATE TABLE appointments (
	id serial NOT NULL,
	id_medic int NOT NULL,
	id_patient int NOT NULL,
	date DATE NOT NULL,
	time_init TIME NOT NULL,
	time_end TIME NOT NULL,
	price DECIMAL(5,2) NOT NULL,
	status varchar(15),
	CONSTRAINT appointments_pk PRIMARY KEY (id)
) WITH (
	OIDS=FALSE
);


ALTER TABLE appointments ADD CONSTRAINT appointments_fk0 FOREIGN KEY (id_medic) REFERENCES medics(id);
ALTER TABLE appointments ADD CONSTRAINT appointments_fk1 FOREIGN KEY (id_patient) REFERENCES patients(id);