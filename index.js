const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '9636463361',
	database: 'EmployeeDB',
	multipleStatements: true
});

//Get all employees
mysqlConnection.connect((err) => {
	if(!err)
		console.log('DB connection succeded.');
	else
		console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));

});

app.listen(3001,()=>console.log('Express server is running at port no : 3001'));

//get all employees
app.get('/employees',(req,res)=>{
	mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})

});

//get an employees
app.get('/employees/:id',(req,res)=>{
	mysqlConnection.query('SELECT * FROM employee WHERE EmpId = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})

});


//Delete an employees
app.delete('/employees/:id',(req,res)=>{
	mysqlConnection.query('DELETE FROM employee WHERE EmpId = ?',[req.params.id],(err, rows, fields)=>{
		if(!err)
			res.send('Deleted succesfully.');
		else
			console.log(err);
	})

});


//Insert an employees
app.post('/employees',(req,res)=>{
	let emp = req.body;
	var sql = "SET @EmpId = ?;SET @Name = ?;SET @Age = ?;SET @Email = ?;SET @Phone_Number = ?;\
	CALL employeeAddOrEdit(@EmpId,@Name,@Age,@Email,@Phone_Number);";
	mysqlConnection.query(sql, [emp.EmpId, emp.Name, emp.Age, emp.Email, emp.Phone_Number],(err, rows, fields)=>{
		if(!err)
			rows.forEach(element => {
				if(element.constructor == Array)
					res.send('Inserted employee id : '+element[0].EmpId);
			});
		else
			console.log(err);
	})

});


//Update an employees
app.put('/employees',(req,res)=>{
	let emp = req.body;
	var sql = "SET @EmpId = ?;SET @Name = ?;SET @Age = ?;SET @Email = ?;SET @Phone_Number = ?;\
	CALL employeeAddOrEdit(@EmpId,@Name,@Age,@Email,@Phone_Number);";
	mysqlConnection.query(sql, [emp.EmpId, emp.Name, emp.Age, emp.Email, emp.Phone_Number],(err, rows, fields)=>{
		if(!err)
			res.send('Update succesfully');
		else
			console.log(err);
	})

});
