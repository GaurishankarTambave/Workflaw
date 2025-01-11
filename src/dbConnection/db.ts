// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// const connection = mysql.createConnection({
//   host: 'newtestabx.database.windows.net',
//   user: 'test',
//   password: 'Vijay@123',
//   database: 'nodedbtestnew',
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database');
// });

// export default connection;


export default connection;
const Connection = require('tedious').Connection;  
    const config = {  
        server: 'newtestabx.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'test', //update me
                password: 'Vijay@123'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'nodedbtestnew'  //update me
        }
    };  
    var connection = new Connection(config);  
    

    connection.on('connect', function() {  
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement();  
    });  
    
    connection.connect();
  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
  
    function executeStatement() {  
        var request = new Request("Select * from  SalesLT.Address", function(err: any) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns: any[]) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount: string, more: any) {  
        console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount: any, more: any) {
            connection.close();
        });
        connection.execSql(request);  
    }