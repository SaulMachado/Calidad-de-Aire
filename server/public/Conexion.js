const mysql = require('mysql');

/* module.exports = () => {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "dbsensores"
    })
} */


const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bdstevia'
});


//se conecta a la base de datos .connect
mysqlConnection.connect(function(err) {
    if (err) {
        console.log(err);
        return
    } else {
        console.log('DB is connected');
    }
});


//exportar el archivo de coneccion
module.exports = mysqlConnection;