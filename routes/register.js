const express = require('express')
const router = express.Router()

router.post('/user',(req, res)=>{
	const body = req.body 
	res.json({
		confirmation: "Form data have been posted successfully.",
		route: "Register Route",
		data: body
	})
})


module.exports = router