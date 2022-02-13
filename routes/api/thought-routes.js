const router = require('express').Router();
const {
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


router.route('/thoughts')
  .get(getAllThoughts)
  .post(createThought);

router.route('thoughts/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route('thoughts/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;