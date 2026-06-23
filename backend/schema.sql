-- ============================================================
-- DATABASE: Centro de Estética María Fornet
-- Database: PostgreSQL (Supabase)
-- ============================================================
-- ============================================================
-- TABLES
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'client')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE client (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(150),
  phone VARCHAR(20),
  email VARCHAR(150),
  birth_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE service (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES category(id) ON DELETE
  SET
    NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price NUMERIC(8, 2),
    duration_min INT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE appointment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client(id) ON DELETE
  SET
    NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    status VARCHAR(30) DEFAULT 'pending' CHECK (
      status IN ('pending', 'confirmed', 'completed', 'cancelled')
    ),
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appointment_service (
  id SERIAL PRIMARY KEY,
  appointment_id UUID REFERENCES appointment(id) ON DELETE CASCADE,
  service_id INT REFERENCES service(id) ON DELETE
  SET
    NULL,
    applied_price NUMERIC(8, 2),
    is_package_session BOOLEAN DEFAULT FALSE,
    client_package_id UUID
);

CREATE TABLE package (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price NUMERIC(8, 2) NOT NULL,
  total_sessions INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE package_detail (
  id SERIAL PRIMARY KEY,
  package_id INT REFERENCES package(id) ON DELETE CASCADE,
  service_id INT REFERENCES service(id) ON DELETE
  SET
    NULL,
    session_count INT NOT NULL DEFAULT 1
);

CREATE TABLE client_package (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client(id) ON DELETE CASCADE,
  package_id INT REFERENCES package(id) ON DELETE
  SET
    NULL,
    purchase_date DATE DEFAULT CURRENT_DATE,
    total_sessions INT NOT NULL,
    sessions_used INT DEFAULT 0,
    paid_price NUMERIC(8, 2),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE client_package_use (
  id SERIAL PRIMARY KEY,
  client_package_id UUID REFERENCES client_package(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointment(id) ON DELETE
  SET
    NULL,
    service_id INT REFERENCES service(id) ON DELETE
  SET
    NULL,
    used_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE payment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client(id) ON DELETE
  SET
    NULL,
    appointment_id UUID REFERENCES appointment(id) ON DELETE
  SET
    NULL,
    client_package_id UUID REFERENCES client_package(id) ON DELETE
  SET
    NULL,
    concept VARCHAR(200),
    amount NUMERIC(8, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'cash' CHECK (
      payment_method IN ('cash', 'card', 'bizum', 'transfer')
    ),
    paid_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE
  appointment_service
ADD
  CONSTRAINT fk_client_package FOREIGN KEY (client_package_id) REFERENCES client_package(id) ON DELETE
SET
  NULL;

-- ============================================================
-- DATA: CATEGORIES
-- ============================================================
INSERT INTO
  category (name, sort_order)
VALUES
  ('Manos y Pies', 1),
  ('Depilación Facial y Corporal', 2),
  ('Tratamientos Faciales', 3),
  ('Tratamientos Corporales', 4),
  ('Lifting de Pestañas', 5),
  ('Bonos', 6),
  ('Tratamientos INDIBA', 7);

-- ============================================================
-- DATA: SERVICES — Manos y Pies (category_id = 1)
-- ============================================================
INSERT INTO
  service (category_id, name, price)
VALUES
  (1, 'Manicura', 10.00),
  (1, 'Esmaltado semipermanente', 16.00),
  (1, 'Esmaltado semipermanente con relleno', 25.00),
  (1, 'Retirada semipermanente', 10.00),
  (1, 'Pedicura', 25.00),
  (1, 'Pedicura + esmaltado semipermanente', 41.00),
  (1, 'Pedicura + esmaltado normal', 35.00),
  (1, 'Esmaltado semipermanente en pies', 16.00),
  (1, 'Esmaltado normal en pies', 10.00),
  (1, '1ª puesta uñas acrílicas', 35.00),
  (1, 'Relleno de uñas', 25.00),
  (1, 'Arreglo uña rota', 3.00);

-- ============================================================
-- DATA: SERVICES — Depilación Facial y Corporal (category_id = 2)
-- ============================================================
INSERT INTO
  service (category_id, name, price)
VALUES
  (2, 'Depilación cejas', 7.00),
  (2, 'Tinte de cejas', 5.00),
  (2, 'Depilación cejas + tinte', 12.00),
  (2, 'Depilación labio superior', 3.00),
  (2, 'Depilación labio inferior', 3.00),
  (2, 'Depilación mentón', 4.00),
  (2, 'Depilación pómulos', 4.00),
  (2, 'Depilación nariz', 3.00),
  (2, 'Depilación brazos completos', 14.00),
  (2, 'Depilación medios brazos', 7.00),
  (2, 'Depilación axilas', 8.00),
  (2, 'Depilación espalda', 15.00),
  (2, 'Depilación piernas completas', 18.00),
  (2, 'Depilación medias piernas', 9.00),
  (2, 'Depilación ingles normales', 8.00),
  (2, 'Depilación ingles brasileñas', 12.00),
  (2, 'Depilación pubis completo', 14.00),
  (2, 'Depilación perianal', 5.00),
  (2, 'Depilación glúteos', 8.00);

-- ============================================================
-- DATA: SERVICES — Tratamientos Faciales (category_id = 3)
-- ============================================================
INSERT INTO
  service (category_id, name, price)
VALUES
  (3, 'Higiene facial', 49.99),
  (3, 'Collagen Booster', 90.00),
  (3, 'Hyaluronic', 60.00),
  (3, 'Glycolic + Vitamina C', 60.00),
  (3, 'Tratamiento pieles grasas', 60.00),
  (3, 'Lab Biotics - Probiotics', 60.00),
  (3, 'Tratamiento despigmentante', 60.00),
  (3, 'Bioceuticals - Tratamiento reparante', 60.00);

-- ============================================================
-- DATA: SERVICES — Tratamientos Corporales (category_id = 4)
-- ============================================================
INSERT INTO
  service (category_id, name, price)
VALUES
  (4, 'Presoterapia', 10.00),
  (
    4,
    'Presoterapia + masaje drenante (45 min)',
    20.00
  ),
  (4, 'Masaje relajante cuerpo completo 1h', 45.00),
  (4, 'Masaje relajante 30 min', 22.00);

-- ============================================================
-- DATA: SERVICES — Lifting de Pestañas (category_id = 5)
-- ============================================================
INSERT INTO
  service (category_id, name, price)
VALUES
  (5, 'Lifting de pestañas', 40.00),
  (5, 'Lifting de pestañas (promoción)', 36.00);

-- ============================================================
-- DATA: SERVICES — Tratamientos INDIBA (category_id = 7)
-- ============================================================
INSERT INTO
  service (category_id, name, price, duration_min)
VALUES
  (7, 'INDIBA Facial', 80.00, NULL),
  (7, 'INDIBA Piernas', 80.00, NULL),
  (7, 'INDIBA Cartucheras', 60.00, 40),
  (7, 'INDIBA Abdomen', 60.00, 40),
  (7, 'INDIBA Pecho', 60.00, 40),
  (7, 'INDIBA Glúteos', 60.00, 40),
  (7, 'INDIBA Brazos', 60.00, 40);

-- ============================================================
-- DATA: PACKAGES
-- ============================================================
INSERT INTO
  package (name, description, price, total_sessions)
VALUES
  (
    'Bono Presoterapia 10+1',
    '10 sesiones de presoterapia + 1 gratis',
    100.00,
    11
  ),
  (
    'Bono Collagen Booster 6 sesiones',
    '6 sesiones de Collagen Booster',
    486.00,
    6
  ),
  (
    'Bono Glycolic + Hyaluronic 5 sesiones',
    '1 sesión Glycolic + Vitamina C y 4 sesiones Hyaluronic',
    285.00,
    5
  ),
  (
    'Bono Glycolic + Reparante 7 sesiones',
    '1 sesión Glycolic + Vitamina C y 6 sesiones Tratamiento reparante',
    390.00,
    7
  ),
  (
    'Bono Despigmentante 6 sesiones',
    '6 sesiones de Tratamiento despigmentante',
    342.00,
    6
  ),
  (
    'Bono Pieles Grasas 6 sesiones',
    '6 sesiones de Tratamiento pieles grasas',
    342.00,
    6
  ),
  (
    'Bono Probióticos 6 sesiones',
    '6 sesiones de Trat. Probióticos (Lab Biotics)',
    342.00,
    6
  ),
  (
    'Bono INDIBA Facial 3 sesiones',
    '3 sesiones INDIBA Facial (70€/sesión)',
    210.00,
    3
  ),
  (
    'Bono INDIBA Facial 6 sesiones',
    '6 sesiones INDIBA Facial',
    400.00,
    6
  ),
  (
    'Bono INDIBA Piernas 6 sesiones',
    '6 sesiones INDIBA Piernas (70€/sesión)',
    420.00,
    6
  ),
  (
    'Bono INDIBA Piernas 12 sesiones',
    '12 sesiones INDIBA Piernas (65€/sesión)',
    780.00,
    12
  ),
  (
    'Bono INDIBA Cartucheras 6 sesiones',
    '6 sesiones INDIBA Cartucheras 40min (50€/sesión)',
    300.00,
    6
  ),
  (
    'Bono INDIBA Pecho 6 sesiones',
    '6 sesiones INDIBA Pecho 40min',
    300.00,
    6
  ),
  (
    'Bono INDIBA Glúteos 6 sesiones',
    '6 sesiones INDIBA Glúteos 40min',
    300.00,
    6
  ),
  (
    'Bono INDIBA Brazos 6 sesiones',
    '6 sesiones INDIBA Brazos 40min',
    300.00,
    6
  );

-- ============================================================
-- DATA: PACKAGE DETAILS
-- ============================================================
INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  11
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Presoterapia 10+1'
  AND s.name = 'Presoterapia';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Collagen Booster 6 sesiones'
  AND s.name = 'Collagen Booster';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  1
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Glycolic + Hyaluronic 5 sesiones'
  AND s.name = 'Glycolic + Vitamina C';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  4
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Glycolic + Hyaluronic 5 sesiones'
  AND s.name = 'Hyaluronic';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  1
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Glycolic + Reparante 7 sesiones'
  AND s.name = 'Glycolic + Vitamina C';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Glycolic + Reparante 7 sesiones'
  AND s.name = 'Bioceuticals - Tratamiento reparante';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Despigmentante 6 sesiones'
  AND s.name = 'Tratamiento despigmentante';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Pieles Grasas 6 sesiones'
  AND s.name = 'Tratamiento pieles grasas';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono Probióticos 6 sesiones'
  AND s.name = 'Lab Biotics - Probiotics';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  3
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Facial 3 sesiones'
  AND s.name = 'INDIBA Facial';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Facial 6 sesiones'
  AND s.name = 'INDIBA Facial';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Piernas 6 sesiones'
  AND s.name = 'INDIBA Piernas';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  12
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Piernas 12 sesiones'
  AND s.name = 'INDIBA Piernas';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Cartucheras 6 sesiones'
  AND s.name = 'INDIBA Cartucheras';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Pecho 6 sesiones'
  AND s.name = 'INDIBA Pecho';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Glúteos 6 sesiones'
  AND s.name = 'INDIBA Glúteos';

INSERT INTO
  package_detail (package_id, service_id, session_count)
SELECT
  p.id,
  s.id,
  6
FROM
  package p,
  service s
WHERE
  p.name = 'Bono INDIBA Brazos 6 sesiones'
  AND s.name = 'INDIBA Brazos';