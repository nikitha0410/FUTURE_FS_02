const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

mongoose.connect("mongodb://127.0.0.1:27017/minicrm")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const Lead = require("./models/Lead");


// GET ALL LEADS
app.get("/leads", async (req, res) => {

  const leads = await Lead.find();

  res.json(leads);
});


// ADD LEAD
app.post("/addLead", async (req, res) => {

  const newLead = new Lead({

    name: req.body.name,

    email: req.body.email,

    status: req.body.status,

    notes: req.body.notes

  });

  await newLead.save();

  res.json({
    message: "Lead Added"
  });
});


// DELETE LEAD
app.delete("/deleteLead/:id", async (req, res) => {

  await Lead.findByIdAndDelete(req.params.id);

  res.json({
    message: "Lead Deleted"
  });
});


// UPDATE STATUS
app.put("/updateStatus/:id", async (req, res) => {

  const lead = await Lead.findById(req.params.id);

  lead.status =
    lead.status === "New"
      ? "Contacted"
      : "New";

  await lead.save();

  res.json({
    message: "Status Updated"
  });
});

app.get("/", (req, res) => {
    res.send("Mini CRM Backend Running");
});

app.listen(5000, () => {

  console.log("Server Running on Port 5000");

});