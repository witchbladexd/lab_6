create table test (
    id SERIAL PRIMARY KEY,
    name TEXT
)

create table vopros (
    id SERIAL PRIMARY KEY,
    zagolovok TEXT,
    test_id INTEGER,
    FOREIGN KEY (test_id) REFERENCES test(id)
)

create table otvet (
    id SERIAL PRIMARY KEY,
    opisanie TEXT,
    isTrue BOOLEAN,
    vopros_id INTEGER,
    FOREIGN KEY (vopros_id) REFERENCES vopros(id)
)