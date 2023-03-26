// "eylem" routerını buraya yazın
const express = require("express");
const router = express.Router();
const actionModel = require("./actions-model");
const { validateActionsID, validateActions } = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    let allActions = await actionModel.get();
    res.json(allActions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateActionsID, async (req, res, next) => {
  res.json(req.existAction);
});

router.post("/", validateActions, async (req, res, next) => {
  try {
    let action = req.actionPayload;
    let createdAction = await actionModel.insert(action);
    res.json(createdAction);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  validateActionsID,
  validateActions,
  async (req, res, next) => {
    try {
      let updatedAction = await actionModel.update(
        req.params.id,
        req.actionPayload
      );
      res.json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", validateActionsID, async (req, res, next) => {
  try {
    await actionModel.remove(req.params.id);
    res.json({ message: "Action silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
