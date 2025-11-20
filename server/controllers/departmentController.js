import Department from '../models/Department.js';

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
    return res.status(200).json({success: true, departments})
  } catch(error) {
     return res.status(500).json({ success: false, error: error.message || "Server Error" });
  }
}
 
const addDepartment = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { dep_name, description } = req.body;

    if (!dep_name || dep_name.trim() === "") {
      return res.status(400).json({ success: false, error: "Department name is required" });
    }

    const newDep = new Department({ dep_name: dep_name.trim(), description: description?.trim() });
    const savedDep = await newDep.save();
    console.log("Department saved:", savedDep);

    res.status(200).json({
      success: true,
      message: "Department added successfully",
      department: savedDep
    });

  } catch (error) {
    console.error("Add Department Error:", error);
    res.status(500).json({ success: false, error: error.message || "Server Error" });
  }
};

const getDepartment = async (req, res) => {
  try{
    const {id} = req.params;
    const department = await Department.findById({_id: id})
    return res.status(200).json({success: true, department})
  } catch(error) {
     return res.status(500).json({ success: false, error: error.message || "Server Error" });
  }
}

const updateDepartment = async (req, res) => {
   try{
    const {id} = req.params;
    const {dep_name, description} = req.body;
    const upadateDep = await Department.findByIdAndUpdate({_id: id},{
      dep_name,
      description
    })
  return res.status(200).json({success: true, upadateDep})
  } catch(error) {
     return res.status(500).json({ success: false, error: error.message || "Server Error" });
  }
}

const deleteDepartment = async (req, res) => {
  try{
    const {id} = req.params;
    const DeleteDep = await Department.findById({_id: id})
    await DeleteDep.deleteOne()
    return res.status(200).json({success: true, DeleteDep})
  } catch(error) {
     return res.status(500).json({ success: false, error: error.message || "Server Error" });
  }
}
export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
