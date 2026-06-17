-- MARIAFORNETESTETICA CRM — Database schema
-- Run this script on Aiven (or local MySQL for development)
CREATE DATABASE IF NOT EXISTS mariafornetestetica_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE mariafornetestetica_crm;

-- ─────────────────────────────────────────
-- Table: client
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS client (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  name VARCHAR(150) NOT NULL,
  contact VARCHAR(150) NOT NULL,
  modality ENUM(
    'Boda',
    'Marca personal',
    'Pareja',
    'Bautizo',
    'Comunión',
    'Eventos',
    'Discotecas y Ocio',
    'Negocios y empresas',
    'Otros'
  ) NOT NULL,
  status ENUM(
    'Contactado',
    'Interesado',
    'Presupuesto enviado',
    'En seguimiento',
    'Cerrado',
    'Perdido'
  ) NOT NULL DEFAULT 'Contactado',
  responsible ENUM('Alicia', 'Marta', 'Alejandro') NOT NULL,
  source VARCHAR(255) DEFAULT NULL,
  amount DECIMAL(10, 2) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────
-- Table: user (MARIAFORNETESTETICA team)
-- Used for JWT login
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);