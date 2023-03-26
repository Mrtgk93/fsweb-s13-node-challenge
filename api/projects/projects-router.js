// "project" routerını buraya yazın!
const express = require("express");
const ProjectModel = require("./projects-model");
const {
  validateProjectsID,
  validateProject,
} = require("./projects-middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let allProjects = await ProjectModel.get();
    res.status(200).json(allProjects);
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateProjectsID, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, async (req, res, next) => {
  try {
    let project = req.project;
    let createdProject = await ProjectModel.insert(project);
    res.json(createdProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateProjectsID,
  validateProject,
  async (req, res, next) => {
    try {
      let updatedProject = await ProjectModel.update(
        req.params.id,
        req.project
      );
      res.json(updatedProject);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", validateProjectsID, async (req, res, next) => {
  try {
    await ProjectModel.remove(req.params.id);
    res.json({ message: "Silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", validateProjectsID, async (req, res, next) => {
  try {
    let projectActions = await ProjectModel.getProjectActions(req.params.id);
    res.json(projectActions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
