const { Router } = require("express");
const controller = require("./conroller");

const router = Router();

router.get("/", controller.GetQuestions);
router.get("/:id", controller.getQuestionById);

router.post("/", controller.addQuestion);
router.put("/:id", controller.editQuestion);
router.delete("/:id", controller.deleteQuestion);

module.exports = router;
