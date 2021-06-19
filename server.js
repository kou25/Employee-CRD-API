//import package
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Employees, { validateEmployee } from "./dbEmployee.js";
//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());


//secure messges
app.use(cors());

//DB Config
const connection_url =
  "mongodb+srv://admin:OL4FDuuw2T0JmKwH@cluster0.k25wf.mongodb.net/employeeDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//API Endpoint
app.get("/", (req, res) =>
  res.status(200).send("Success !! Employee API is working")
);

// api routes for get employees
app.get("/employees", (req, res) => {
  Employees.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//pi routes for delete employee
app.delete("/employee/:id", async (req, res) => {

    try {
      await Employees.findByIdAndDelete(req.params.id);
      return res.status(200).send("deleted");
    } catch (err) {
      return res.status(500).json({ error: "Error on server" });
    }
  });


// api routes for post employee
app.post("/employee/new", async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let employee = new Employees({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    company: req.body.company,
    current_employee: req.body.current_employee,
  });
  await employee.save();
  res.send(employee);
});

//listen
app.listen(port, () => console.log(`Listling on localhost:${port}`));
