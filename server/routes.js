var router = require('express').Router();
const helper = require('./helpers');


//-----------------------------------
// Products
//---------------------------------

//Retrieve the list of products
router.get('/products', (req, res) => {
  helperFunction(req.url, (err, result) =>{
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

//Returns all product level information for a specified product id
router.get('/products/:product_id', (req, res) => {})

//Returns the all styles available for the given product
router.get('/products/:product_id/styles', (req, res) => {} )

//Returns the id's of products related to the product specified
router.get('/products/:product_id/related', (req, res) => {} )


//-----------------------------------
// Carts
//-----------------------------------

//Retrieves list of products added to the cart by a user
router.get('/cart',(req, res) => {} )

//Adds a product to the cart
router.post('/cart',(req, res) => {} )


//-----------------------------------
// Questions AND Answers
//-----------------------------------

//Get a list of questions for a particular product
router.get('/qa/questions',(req, res) => {} )

//Get a answers for a given question
router.get('/qa/questions/:question_id/answers',(req, res) => {} )

//Adds a question for the given product
router.post('/qa/questions',(req, res) => {} )

//Adds an answer for the given question
router.post('/qa/questions/:question_id/answers',(req, res) => {} )

//Updates a question to show it was found helpful.
router.put('/qa/questions/:question_id/helpful',(req, res) => {} )

//Report Question
router.put('/qa/questions/:question_id/report',(req, res) => {} )

//Mark Answer as Helpful
router.put('/qa/answers/:answer_id/helpful',(req, res) => {} )

//Report answer
router.put('/qa/answers/:answer_id/report',(req, res) => {} )


//-----------------------------------
// Reviews
//-----------------------------------

// List Reviews
router.get('/reviews/',(req, res) => {} );

// Get Review Metadata
router.get('/reviews/meta',(req, res) => {} );

// Add a Review
router.post('/reviews',(req, res) => {} );

// Mark Review as Helpful
router.put('/reviews/:review_id/helpful',(req, res) => {} );

// Report Review
router.put('/reviews/:review_id/report',(req, res) => {} );


module.exports = router;