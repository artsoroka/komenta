module.exports = {
    app: {
        port: process.env.KOMENTA_PORT || 8080,
        uploadDir: __dirname + '/../uploads'
    },
    db: {
        host: process.env.KOMENTA_DB_HOST || 'localhost', 
        port: process.env.KOMENTA_DB_PORT || 28015, 
        db  : process.env.KOMENTA_DB_NAME || 'komenta' 
    }
}; 