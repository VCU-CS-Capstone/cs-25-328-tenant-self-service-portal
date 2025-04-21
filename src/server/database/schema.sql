CREATE TABLE consumers (
    consumer_id UUID PRIMARY KEY,
    consumer_name VARCHAR(255) NOT NULL,
    is_devex_client BOOLEAN,
    consumer_description TEXT
);

CREATE TABLE producers (
    producer_id UUID PRIMARY KEY,
    producer_name VARCHAR(255) NOT NULL,
    is_devex_client BOOLEAN,
    producer_description TEXT
);

CREATE TABLE data_sources (
    data_source_id UUID PRIMARY KEY,
    data_source_name VARCHAR(255) NOT NULL,
    data_source_description TEXT,
    is_devex_client BOOLEAN
);

CREATE TABLE datasets (
    dataset_id UUID PRIMARY KEY,
    dataset_version VARCHAR(10),
    dataset_name VARCHAR(255) NOT NULL,
    line_of_business VARCHAR(100),
    accountable_executive VARCHAR(255),
    performing_data_steward VARCHAR(255),
    managing_data_steward VARCHAR(255),
    description TEXT,
    has_international_data BOOLEAN
);

CREATE TABLE managed_field_contracts (
    id SERIAL PRIMARY KEY,
    dataset_id UUID REFERENCES datasets(dataset_id),
    field_name VARCHAR(100),
    field_type VARCHAR(50),
    date_format VARCHAR(50),
    is_field_tokenized BOOLEAN,
    is_required BOOLEAN,
    is_mapped_from_client_field BOOLEAN,
    mapped_from_field_name VARCHAR(100)
);

CREATE TABLE client_field_contracts (
    id SERIAL PRIMARY KEY,
    dataset_id UUID REFERENCES datasets(dataset_id),
    field_name VARCHAR(100),
    field_type VARCHAR(50),
    date_format VARCHAR(50),
    is_field_tokenized BOOLEAN,
    is_required BOOLEAN
);

CREATE TABLE keyword_values (
    id SERIAL PRIMARY KEY,
    managed_field_contract_id INTEGER REFERENCES managed_field_contracts(id),
    value VARCHAR(100)
);

CREATE TABLE dataset_producers (
    dataset_id UUID REFERENCES datasets(dataset_id),
    producer_id UUID REFERENCES producers(producer_id),
    PRIMARY KEY (dataset_id, producer_id)
);

CREATE TABLE dataset_consumers (
    dataset_id UUID REFERENCES datasets(dataset_id),
    consumer_id UUID REFERENCES consumers(consumer_id),
    PRIMARY KEY (dataset_id, consumer_id)
);

CREATE TABLE dataset_data_sources (
    dataset_id UUID REFERENCES datasets(dataset_id),
    data_source_id UUID REFERENCES data_sources(data_source_id),
    PRIMARY KEY (dataset_id, data_source_id)
);

CREATE TABLE lifecycle_management_policies (
    id SERIAL PRIMARY KEY,
    policy_id VARCHAR(100) UNIQUE
);

CREATE TABLE dataset_lifecycle_policies (
    dataset_id UUID REFERENCES datasets(dataset_id),
    policy_id INTEGER REFERENCES lifecycle_management_policies(id),
    PRIMARY KEY (dataset_id, policy_id)
);

CREATE TABLE comments (
  comment_id  INT AUTO_INCREMENT PRIMARY KEY,
  dataset_id varchar(255) NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_dataset
    FOREIGN KEY (dataset_id) REFERENCES datasets(dataset_id),
  
  CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(id)
);