-- RotateWise Database Schema
-- Run this in phpMyAdmin

-- Drop tables if exist (for fresh install)
DROP TABLE IF EXISTS field_options;
DROP TABLE IF EXISTS form_fields;
DROP TABLE IF EXISTS footer_links;
DROP TABLE IF EXISTS footer_sections;
DROP TABLE IF EXISTS social_links;
DROP TABLE IF EXISTS contact_info;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS admin_settings;
DROP TABLE IF EXISTS site_info;
DROP TABLE IF EXISTS admins;

-- Admins table
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123)
INSERT INTO admins (name, email, password, phone) VALUES 
('Admin', 'admin@rotatewise.com', '$2y$10$8WxYpDLCLPz5E.XR0Y5dXO2pP7M3hvkT1J5QS.R3fAKrJzKhQe2Aq', '+91 98765 43210');

-- Leads table
CREATE TABLE leads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    loan_amount VARCHAR(50),
    employment_status VARCHAR(50),
    message TEXT,
    source VARCHAR(50) DEFAULT 'website',
    status ENUM('new', 'contacted', 'converted', 'closed') DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('lead', 'status', 'reminder', 'system') DEFAULT 'system',
    title VARCHAR(255) NOT NULL,
    message TEXT,
    lead_id INT,
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
);

-- Site info table
CREATE TABLE site_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    site_name VARCHAR(100) DEFAULT 'RotateWise',
    tagline VARCHAR(255),
    description TEXT,
    logo_url TEXT,
    copyright VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default site info
INSERT INTO site_info (id, site_name, tagline, description, copyright) VALUES 
(1, 'RotateWise', 'Smart Credit Card Loan Solutions', 'Expert consultation for credit card loans and financial services.', '© 2024 RotateWise. All rights reserved.');

-- Contact info table
CREATE TABLE contact_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(50) DEFAULT 'custom',
    label VARCHAR(100) NOT NULL,
    value VARCHAR(255) NOT NULL,
    icon VARCHAR(50) DEFAULT 'info',
    link VARCHAR(255),
    enabled TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- Insert default contact info
INSERT INTO contact_info (type, label, value, icon, link, sort_order) VALUES 
('phone', 'Phone', '+91 98765 43210', 'phone', 'tel:+919876543210', 1),
('email', 'Email', 'contact@rotatewise.com', 'mail', 'mailto:contact@rotatewise.com', 2),
('address', 'Address', 'Mumbai, Maharashtra, India', 'map-pin', '', 3),
('hours', 'Working Hours', 'Mon - Fri: 9:00 AM - 6:00 PM', 'clock', '', 4);

-- Footer sections table
CREATE TABLE footer_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    enabled TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- Insert default footer sections
INSERT INTO footer_sections (title, sort_order) VALUES 
('Quick Links', 1),
('Services', 2),
('Legal', 3);

-- Footer links table
CREATE TABLE footer_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    label VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_external TINYINT(1) DEFAULT 0,
    enabled TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (section_id) REFERENCES footer_sections(id) ON DELETE CASCADE
);

-- Insert default footer links
INSERT INTO footer_links (section_id, label, url, sort_order) VALUES 
(1, 'Home', '/', 1),
(1, 'About Us', '/about', 2),
(1, 'Contact', '/contact', 3),
(2, 'Credit Card Loans', '/#services', 1),
(2, 'Loan Consultation', '/#services', 2),
(2, 'Financial Planning', '/#services', 3),
(3, 'Privacy Policy', '/privacy-policy', 1),
(3, 'Terms of Service', '/terms-of-service', 2),
(3, 'Disclaimer', '/disclaimer', 3);

-- Social links table
CREATE TABLE social_links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    enabled TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- Insert default social links
INSERT INTO social_links (platform, url, sort_order) VALUES 
('facebook', 'https://facebook.com/rotatewise', 1),
('twitter', 'https://twitter.com/rotatewise', 2),
('linkedin', 'https://linkedin.com/company/rotatewise', 3),
('instagram', 'https://instagram.com/rotatewise', 4);

-- Form fields table
CREATE TABLE form_fields (
    id INT PRIMARY KEY AUTO_INCREMENT,
    field_name VARCHAR(50) NOT NULL,
    field_label VARCHAR(100) NOT NULL,
    field_type ENUM('text', 'email', 'tel', 'textarea', 'select') DEFAULT 'text',
    placeholder VARCHAR(255),
    is_required TINYINT(1) DEFAULT 0,
    is_enabled TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0
);

-- Insert default form fields
INSERT INTO form_fields (field_name, field_label, field_type, placeholder, is_required, sort_order) VALUES 
('fullName', 'Full Name', 'text', 'Enter your full name', 1, 1),
('email', 'Email Address', 'email', 'Enter your email address', 1, 2),
('phone', 'Phone Number', 'tel', 'Enter your phone number', 1, 3),
('loanAmount', 'Loan Amount Interested', 'select', 'Select loan amount', 1, 4),
('employmentStatus', 'Employment Status', 'select', 'Select your employment status', 1, 5),
('message', 'Additional Information', 'textarea', 'Tell us about your requirements', 0, 6);

-- Field options table (for select fields)
CREATE TABLE field_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    field_id INT NOT NULL,
    option_value VARCHAR(100) NOT NULL,
    option_label VARCHAR(100) NOT NULL,
    option_order INT DEFAULT 0,
    FOREIGN KEY (field_id) REFERENCES form_fields(id) ON DELETE CASCADE
);

-- Insert default options for loan amount
INSERT INTO field_options (field_id, option_value, option_label, option_order) VALUES 
(4, 'under-5000', 'Under ₹5,000', 1),
(4, '5000-10000', '₹5,000 - ₹10,000', 2),
(4, '10000-25000', '₹10,000 - ₹25,000', 3),
(4, '25000-50000', '₹25,000 - ₹50,000', 4),
(4, '50000-100000', '₹50,000 - ₹1,00,000', 5),
(4, 'above-100000', 'Above ₹1,00,000', 6);

-- Insert default options for employment status
INSERT INTO field_options (field_id, option_value, option_label, option_order) VALUES 
(5, 'employed-full', 'Employed Full-Time', 1),
(5, 'employed-part', 'Employed Part-Time', 2),
(5, 'self-employed', 'Self-Employed', 3),
(5, 'business-owner', 'Business Owner', 4),
(5, 'retired', 'Retired', 5),
(5, 'other', 'Other', 6);

-- Admin settings table
CREATE TABLE admin_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email_notifications TINYINT(1) DEFAULT 1,
    daily_summary TINYINT(1) DEFAULT 0,
    weekly_report TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO admin_settings (id, email_notifications, daily_summary, weekly_report) VALUES 
(1, 1, 0, 1);
