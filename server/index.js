const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body


//my routes
//create
app.post("/newissues", async (req, res) =>
{
    try
    {
        const { project, issue_description, resolution, added_by, validated } = req.body;
        const newIssue = await pool.query("INSERT INTO tracker (project, issue_description,resolution,added_by, validated) VALUES($1,$2,$3,$4,$5) RETURNING *", [project, issue_description, resolution, added_by, validated]);

        res.json(newIssue.rows[0]);

        /*
                    {
    "project": "MTNU",
    "issue_description": "Err logging into the Webcare",
    "resolution": "Core Restart",
    "Added_by": "Claud",
    "validated": "Yes"
    }
    
         */

    } catch (err) 
    {
        console.error(err.message);
    }
});


//update


//All Issues
app.get("/issues", async (req, res) =>
{
    try
    {
        const allissues = await pool.query("SELECT * FROM tracker");
        res.json(allissues.rows);
    } catch (err)
    {
        console.error(err.message)
    }
});


//Searching for a specific issue 
app.get("/issue/:id", async (req, res) =>
{
    try
    {
        console.log(req.params);
    } catch (err)
    {
        console.error(err.message);
    }
})




//server run 
app.listen(5000, () =>
{
    console.log("Server is up on 5000");
});
