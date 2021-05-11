const parentService = require("../service/parent");

async function getRelatedStudents(req, res) {
  const parent_id = req.session.user.id;
  try {
    const students = parentService.getRelatedStudents(parent_id);
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json(err);
  }
}
module.exports = { getRelatedStudents };
