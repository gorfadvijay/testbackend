const pool = require("../../db");

const query = require("./queries");
const GetQuestions = (req, res) => {
  pool.query(query.getAllQuestions, (err, result) => {
    if (err) throw console.error(err);

    if (result.rows.length === 0) {
      res.status(200).json({ message: "No data found." });
    } else {
      res
        .status(200)
        .json({ message: "Data retrieved successfully.", data: result.rows });
    }
  });
};

const addQuestion = (req, res) => {
  const { question, questions_explanation, questions_comments } = req.body;

  pool.query(
    "INSERT INTO questions (question, questions_explanation, questions_comments) VALUES ($1, $2, $3) RETURNING *",
    [question, questions_explanation, questions_comments],
    (err, result) => {
      if (err) {
        console.error("Error creating question:", err);
        res.status(500).send("Error creating question");
      } else {
        if (result.rows.length > 0) {
          const insertedQuestion = result.rows[0];
          res.status(201).json({
            code: 201,
            message: "Question created successfully",
            data: insertedQuestion,
          });
          console.log("Success:", insertedQuestion);
        } else {
          res.status(500).send("Error creating question");
        }
      }
    }
  );
};

const editQuestion = (req, res) => {
  const questions_id = req.params.id;
  const { question, questions_explanation, questions_comments } = req.body;

  console.log("questions_id", questions_id);

  pool.query(
    query.editQuestionQuery,
    [question, questions_explanation, questions_comments, questions_id],
    (err, result) => {
      if (err) {
        console.error("Error editing question:", err);
        res.status(500).send("Error editing question");
      } else {
        if (result.rowCount === 0) {
          console.log("result", result);
          res.status(404).send("Question not found");
        } else {
          res.status(200).send("Question edited successfully");
        }
      }
    }
  );
};

const deleteQuestion = (req, res) => {
  const questions_id = req.params.id;

  pool.query(query.deleteQuestionQuery, [questions_id], (err, result) => {
    if (err) {
      console.error("Error deleting question:", err);
      res.status(500).send("Error deleting question");
    } else {
      if (result.rowCount === 0) {
        res.status(404).send("Question not found");
      } else {
        res.status(200).send("Question deleted successfully");
      }
    }
  });
};
const getQuestionById = (req, res) => {
  const questions_id = req.params.id;

  console.log("questions_id", questions_id);
  pool.query(query.getById, [questions_id], (err, result) => {
    if (err) {
      console.error("Error retrieving question:", err);
      res.status(500).send("Error retrieving question");
    } else {
      if (result.rowCount === 0) {
        res.status(404).send("Question not found");
      } else {
        const question = result.rows[0];
        console.log("qqq", question);
        res.status(200).json(question);
      }
    }
  });
};

module.exports = {
  GetQuestions,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getQuestionById,
};
