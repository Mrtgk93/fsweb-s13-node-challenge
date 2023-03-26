// projects ara yazılımları buraya
const ProjectsModel = require("./projects-model");

function logger(req, res, next) {
  console.log(
    `[${new Date().toLocaleString()}] method: ${req.method} url: ${
      req.url
    } ip: ${req.get("Origin")}`
  );
  next();
}

async function validateProjectsID(req, res, next) {
  try {
    let Projects = await ProjectsModel.get(req.params.id);
    if (!Projects) {
      res.status(404).json({ message: "not found" });
    } else {
      req.project = Projects;
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateProject(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ message: "eksik alan var" });
    } else {
      req.project = {
        name: name,
        description: description,
        completed: req.body.completed,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = { logger, validateProjectsID, validateProject };
