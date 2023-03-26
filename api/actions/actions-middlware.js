// eylemlerle ilgili ara katman yazılımları yazın
const e = require("express");
const ActionsModel = require("./actions-model");
const ProjectsModel = require("../projects/projects-model");

async function validateActionsID(req, res, next) {
  try {
    let action = await ActionsModel.get(req.params.id);
    if (!action) {
      res.status(404).json({ message: "not found" });
    } else {
      req.existAction = action;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function validateActions(req, res, next) {
  try {
    const { project_id, description, notes } = req.body;
    let isExistPtoject = await ProjectsModel.get(project_id);
    let isValidLengthDescription = description && description.length < 128;
    if (!isExistPtoject || !isValidLengthDescription || !notes) {
      res.status(400).json({ message: "eksik alan var" });
    } else {
      req.actionPayload = {
        project_id: project_id,
        description: description,
        notes: notes,
        completed: req.body.completed,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { validateActionsID, validateActions };
