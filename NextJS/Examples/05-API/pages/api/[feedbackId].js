import {buildFeedbackPath,extractFeedback} from './feedback'

function handler(req,res) {
    const ID = req.query.feedbackId;
    const filePath = buildFeedbackPath()
    const feedbackData = extractFeedback(filePath)
    const selectedFeedback = feedbackData.find((feedback) => feedback.id === ID)
    res.status(200).json({feedback:selectedFeedback})
}
export default handler;