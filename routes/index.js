// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

/*  This is the home route. It renders the index.mustache page from the views directory.
  Data is rendered using the Mustache templating engine. For more
  information, view here: https://mustache.github.io/#demo */

const profiles= {
	sjobs: {
		name: 'Stave Jobs',
		// image: '/images/sjobs.jpg',
		username: "sjobs",
		company: 'apple',
		languages: ['javascript', 'swift', 'python']
	},
	bgates: {
		name: 'Bill Gates',
		// image: '/images/bgets.jpg',
		username: "bgates",
		company: 'microsoft',
		languages: ['javascript', 'swift', 'python']
	}
}


router.get('/', (req, res) => {
  res.render('index', { text: 'This is the dynamic data. Open index.js from the routes directory to see.' })
})

router.post('/addprofile',(req,res)=>{
	// const name = req.body.name
	// const username = req.body.username
	// const company = req.body.company
	// const languages = req.body.languages.split(',')// for making a array of languages

	// const profile = {
	// 	name: name,
	// 	username: username
	// 	company: company,
	// 	languages: languages
	// }

	const profile = req.body
	profile['languages']=req.body.languages.split(',')
	

	profiles[profile.username]= profile

	res.redirect('/profile/'+profile.username)
	// res.json({
	// 	confirmation: 'success',
	// 	data: profile
	// })
})

router.post('/post',(req, res)=>{
	const body = req.body 
	res.json({
		confirmation: "Form data have been posted successfully.",
		data: body
	})
})

router.get('/test',(req, res)=>{
	res.json({
		message: "This is the test route"
	})
})


//extracting query parameters
router.get('/query', (req, res)=>{
	const name=req.query.name
	const username= req.query.userName
	const data = {
		name: name,
		username: username
	}
	// res.json({
	// 	queryParameterName: name,
	// 	queryParameterUserName: username
	// })
	res.render('profile',data)
})





router.get('/profiles',(req, res)=>{
	
	const list = []

	Object.keys(profiles).forEach(key=>{
		list.push(profiles[key])
	})

	// const timestamp = new Date()
	const data ={
		profiles: list, 
		timestamp: req.timestamp
	}

	res.render('profiles', data)

})





// extracting url parameters
router.get('/:path', (req, res)=>{
	const passingParameters = req.params.path
	res.json({
		message: passingParameters
	})
})

//extracting multiple url parameters and getting data from profiles object using profile name
router.get('/:profile/:username', (req, res)=>{
	const username = req.params.username
	// const username = req.params.username
	const profile = profiles[username]
	if(profile == null){
		res.json({
			confirmation: "failed",
			message: 'Profile '+ username +' is not found.'
		})
	}
	// res.json({
	// 	message: "Profile for "+ username + " is found in the profiles object.",
	// 	profile: profile
	// })
	// const timestamp = new Date()
	profile.timestamp = req.timestamp
	res.render('profile', profile)
})








module.exports = router
