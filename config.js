require("dotenv").config();
module.exports = {
    PORT: process.env.PORT || 8000,
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://jason:carcamo11@localhost/shoe-comp-db-test'
}