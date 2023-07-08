const getAllQuestions = "SELECT * FROM questions";

const createQuestion = `
  INSERT INTO questions (
    question,
    questions_explanation,
    questions_comments,

  ) VALUES ($1, $2, $3)
  RETURNING *
`;
const editQuestionQuery = `
  UPDATE questions
  SET question = $1,
      questions_explanation = $2,
      questions_comments = $3,
      updated_at = current_timestamp
  WHERE questions_id = $4
  RETURNING *;
`;
const deleteQuestionQuery = `
  DELETE FROM questions
  WHERE questions_id = $1
  RETURNING *;
`;
const getById = `
SELECT 
  *
FROM 
  questions
WHERE 
  questions_id = $1;
`;

module.exports = {
  getAllQuestions,
  createQuestion,
  editQuestionQuery,
  deleteQuestionQuery,
  getById,
};
