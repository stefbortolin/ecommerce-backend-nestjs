SELECT 'CREATE DATABASE ecommercedb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ecommercedb')\gexec