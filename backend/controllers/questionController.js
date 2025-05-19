const Session = require("../models/Session");
const Question = require("../models/Question");

exports.togglePinQuestion = async (req, res) => {
  try {

    const question=await Question.findById(req.params.id);
    
    if(!question){
      return res.status(404).json({success:false,message:"Question not found"})
    }

    question.isPinned=!question.isPinned;
    await question.save();

    res.status(200).json({success:true,question})
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.updateQuestionNote = async (req, res) => {
  try {

    const {note}=req.body;
    const question=await Question.findById(req.params.id);

    if(!question){

      return res.status(404).json({success:false,message:"Question not found"});
    }

    question.note=note || "";
    await question.save();

    res.status(200).json({success:true,question});

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addQuestionsToSession = async (req, res) => {
  try {

    const {sessionId,questions}=req.body;

    if(!sessionId || !questions || !Array.isArray(questions)){
      return res.status(400).json({message:"Invaild input data"});
    }

    const session=await Session.findById(sessionId);

    if(!session){
      return res.status(401).json({message:"Session not found"})
    }

    //create new question

    const createQuestions=await Question.insertMany(
      questions.map((q)=>({
        session:sessionId,
        question:q.question,
        answer:q.answer

      }))
    )

//Update session to include new question IDs


session.questions.push(...createQuestions.map((q)=>q._id))
await session.save();

res.status(201).json(createQuestions);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
