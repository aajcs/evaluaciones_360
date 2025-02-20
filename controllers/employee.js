const Employee = require("../models/employee");

const createEmployee = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      position,
      department,
      hireDate,
      evaluations,
    } = req.body;
    const employee = await Employee.create({
      userId,
      firstName,
      lastName,
      position,
      department,
      hireDate,
      evaluations,
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      position,
      department,
      hireDate,
      evaluations,
    } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        userId,
        firstName,
        lastName,
        position,
        department,
        hireDate,
        evaluations,
      },
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
