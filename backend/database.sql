-- RotateWise Database Schema
-- Run this SQL in your Hostinger phpMyAdmin

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin (password: admin123)
INSERT INTO admins (name, email, password, phone) VALUES 
('Admin', 'admin@rotatewise.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+91 1234567890');

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    loan_amount VARCHAR(50),
    employment_status VARCHAR(50),
    message TEXT,
    source VARCHAR(50) DEFAULT 'contact-page',
    status ENUM('new', 'contacted', 'converted', 'closed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('lead', 'status', 'reminder', 'system') DEFAULT 'system',
    title VARCHAR(200) NOT NULL,
    message TEXT,
    lead_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
);

-- Create site_info table
CREATE TABLE IF NOT EXISTS site_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_key VARCHAR(50) UNIQUE NOT NULL,
    site_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default site info
INSERT INTO site_info (site_key, site_value) VALUES 
('siteName', 'RotateWise'),
('tagline', 'Smart Credit Card Loan Solutions'),
('description', 'Your trusted partner for credit card loan consultation. We help you find the best loan options tailored to your needs.'),
('copyright', '© 2024 RotateWise. All rights reserved.'),
('logo', '');

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    link VARCHAR(255),
    enabled BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- Insert default contact info
INSERT INTO contact_info (type, label, value, icon, link, sort_order) VALUES 
('phone', 'Phone', '+91 1234567890', 'phone', 'tel:+911234567890', 1),
('email', 'Email', 'contact@rotatewise.com', 'mail', 'mailto:contact@rotatewise.com', 2),
('address', 'Address', '123 Finance Street, Mumbai, India', 'mapPin', '', 3),
('hours', 'Business Hours', 'Mon - Fri: 9:00 AM - 6:00 PM', 'clock', '', 4);

-- Create footer_sections table
CREATE TABLE IF NOT EXISTS footer_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- Create footer_links table
CREATE TABLE IF NOT EXISTS footer_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    label VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_external BOOLEAN DEFAULT FALSE,
    enabled BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (section_id) REFERENCES footer_sections(id) ON DELETE CASCADE
);

-- Insert default footer sections
INSERT INTO footer_sections (title, sort_order) VALUES 
('Quick Links', 1),
('Services', 2),
('Legal', 3);

-- Insert default footer links
INSERT INTO footer_links (section_id, label, url, sort_order) VALUES 
(1, 'Home', '/', 1),
(1, 'About Us', '/about', 2),
(1, 'Contact', '/contact', 3),
(2, 'Credit Card Loans', '/#services', 1),
(2, 'Debt Consolidation', '/#services', 2),
(2, 'Financial Planning', '/#services', 3),
(3, 'Privacy Policy', '/privacy-policy', 1),
(3, 'Terms of Service', '/terms-of-service', 2),
(3, 'Disclaimer', '/disclaimer', 3);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- Insert default social links
INSERT INTO social_links (platform, url, sort_order) VALUES 
('facebook', 'https://facebook.com', 1),
('twitter', 'https://twitter.com', 2),
('linkedin', 'https://linkedin.com', 3),
('instagram', 'https://instagram.com', 4);

-- Create form_fields table
CREATE TABLE IF NOT EXISTS form_fields (
    id INT AUTO_INCREMENT PRIMARY KEY,
    field_name VARCHAR(50) NOT NULL,
    label VARCHAR(100) NOT NULL,
    field_type ENUM('text', 'email', 'tel', 'textarea', 'select') DEFAULT 'text',
    placeholder VARCHAR(200),
    required BOOLEAN DEFAULT FALSE,
    enabled BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- Create form_options table (for select fields)
CREATE TABLE IF NOT EXISTS form_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    field_id INT NOT NULL,
    option_value VARCHAR(100) NOT NULL,
    option_label VARCHAR(100) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (field_id) REFERENCES form_fields(id) ON DELETE CASCADE
);

-- Insert default form fields
INSERT INTO form_fields (field_name, label, field_type, placeholder, required, sort_order) VALUES 
('fullName', 'Full Name', 'text', 'Enter your full name', TRUE, 1),
('email', 'Email Address', 'email', 'Enter your email', TRUE, 2),
('phone', 'Phone Number', 'tel', 'Enter your phone number', TRUE, 3),
('loanAmount', 'Loan Amount Interested', 'select', 'Select loan amount', TRUE, 4),
('employmentStatus', 'Employment Status', 'select', 'Select employment status', TRUE, 5),
('message', 'Additional Information', 'textarea', 'Tell us more about your requirements', FALSE, 6);

-- Insert default form options for loanAmount (field_id = 4)
INSERT INTO form_options (field_id, option_value, option_label, sort_order) VALUES 
(4, 'under-5000', 'Under ₹5,000', 1),
(4, '5000-10000', '₹5,000 - ₹10,000', 2),
(4, '10000-25000', '₹10,000 - ₹25,000', 3),
(4, '25000-50000', '₹25,000 - ₹50,000', 4),
(4, '50000-plus', '₹50,000+', 5);

-- Insert default form options for employmentStatus (field_id = 5)
INSERT INTO form_options (field_id, option_value, option_label, sort_order) VALUES 
(5, 'employed-full', 'Employed Full-Time', 1),
(5, 'employed-part', 'Employed Part-Time', 2),
(5, 'self-employed', 'Self-Employed', 3),
(5, 'business-owner', 'Business Owner', 4),
(5, 'retired', 'Retired', 5),
(5, 'student', 'Student', 6),
(5, 'other', 'Other', 7);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    setting_key VARCHAR(50) NOT NULL,
    setting_value TEXT,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE,
    UNIQUE KEY unique_admin_setting (admin_id, setting_key)
);

-- Insert default admin settings
INSERT INTO admin_settings (admin_id, setting_key, setting_value) VALUES 
(1, 'emailNotifications', 'true'),
(1, 'dailySummary', 'true'),
(1, 'weeklyReport', 'false');
