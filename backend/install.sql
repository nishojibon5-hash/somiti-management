-- সমিতি ম্যানেজার Database Schema
-- cPanel MySQL এ এই queries run করুন

-- Organizations table
CREATE TABLE organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    org_name VARCHAR(100) NOT NULL,
    org_address TEXT,
    contact_person VARCHAR(100),
    mobile_number VARCHAR(15),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Users table  
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    organization_id INT,
    role ENUM('admin', 'manager', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Members table
CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(20) UNIQUE NOT NULL,
    member_name VARCHAR(100) NOT NULL,
    nid_number VARCHAR(20) UNIQUE NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    worker_name VARCHAR(50) NOT NULL,
    loan_amount DECIMAL(12,2) DEFAULT 0.00,
    savings_amount DECIMAL(12,2) DEFAULT 0.00,
    daily_installment DECIMAL(10,2) DEFAULT 0.00,
    daily_savings DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('active', 'inactive') DEFAULT 'active',
    organization_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    INDEX idx_member_id (member_id),
    INDEX idx_worker_name (worker_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Collections table
CREATE TABLE collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(20) NOT NULL,
    collection_date DATE NOT NULL,
    loan_collection DECIMAL(10,2) DEFAULT 0.00,
    savings_collection DECIMAL(10,2) DEFAULT 0.00,
    total_collection DECIMAL(10,2) NOT NULL,
    worker_name VARCHAR(50) NOT NULL,
    notes TEXT,
    organization_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id),
    INDEX idx_collection_date (collection_date),
    INDEX idx_member_collection (member_id, collection_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Loans table
CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(20) NOT NULL,
    loan_amount DECIMAL(12,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    installment_amount DECIMAL(10,2) NOT NULL,
    total_installments INT NOT NULL,
    paid_installments INT DEFAULT 0,
    remaining_amount DECIMAL(12,2) NOT NULL,
    loan_date DATE NOT NULL,
    status ENUM('active', 'completed', 'defaulted') DEFAULT 'active',
    organization_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Savings table
CREATE TABLE savings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(20) NOT NULL,
    savings_type ENUM('daily', 'monthly', 'fixed') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    savings_date DATE NOT NULL,
    organization_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Backup logs table
CREATE TABLE backup_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    backup_type ENUM('manual', 'automatic') NOT NULL,
    backup_size INT,
    backup_path VARCHAR(255),
    status ENUM('success', 'failed') NOT NULL,
    organization_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Admin logs table
CREATE TABLE admin_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    organization_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Insert default admin user
INSERT INTO organizations (org_name, contact_person, email) 
VALUES ('Demo Organization', 'System Admin', 'admin@somitimanager.com');

INSERT INTO users (email, password, full_name, organization_id, role) 
VALUES ('admin@somitimanager.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 1, 'admin');

-- Insert demo members
INSERT INTO members (member_id, member_name, nid_number, mobile_number, worker_name, loan_amount, savings_amount, daily_installment, daily_savings, organization_id) VALUES
('SM20240001', 'মোহাম্মদ রহিম', '1234567890123', '01712345678', 'করিম উদ্দিন', 50000.00, 15000.00, 500.00, 100.00, 1),
('SM20240002', 'ফাতেমা খাতুন', '1234567890124', '01712345679', 'রহিম আলী', 75000.00, 22000.00, 750.00, 150.00, 1),
('SM20240003', 'আব্দুল করিম', '1234567890125', '01712345680', 'নূর জাহান', 60000.00, 18000.00, 600.00, 120.00, 1),
('SM20240004', 'রোকেয়া বেগম', '1234567890126', '01712345681', 'করিম উদ্দিন', 40000.00, 12000.00, 400.00, 80.00, 1),
('SM20240005', 'মোহাম্মদ আলী', '1234567890127', '01712345682', 'রহিম আলী', 85000.00, 25000.00, 850.00, 200.00, 1);
