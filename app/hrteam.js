const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 
const util = require ('util')
const db = wrapDB(dbconfig)

function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            console.log("in query in wrapper") 
            return util.promisify( pool.query ) 
            .call(pool, sql, args) 
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ) 
            .call( pool ) 
        } 
    } 
 }

 
 exports.addEmp = async (newEmp) => { 
    let results = await db.query('INSERT INTO Employee SET ?', newEmp) 
    return results.insertId; 
 }

 exports.addSalesEmp = async (newSalesEmp) => { 
    let results = await db.query('INSERT INTO SalesEmployee SET ?', newSalesEmp) 
    return results.insertId; 
 }

 exports.checkIfEmployeeIDexists = (EmployeeID) => {
    return db.query(
        "SELECT Fname FROM Employee WHERE EmployeeID = ?", [EmployeeID]
    )
 }