
const URL='http://nips1.net:34815'

const API={
		API_MAX	: URL + `/queries/max` // /:tablename/:fieldname
	, API_TXS	: URL + '/transactions' // /:txhash
	, API_TICKERS : URL + '/tickers'
	, API_USERINFO : URL + '/users/info'
	, API_TOGGLE_FAVORITE : URL + '/favorites/toggle'
	, API_LOGIN : URL + '/users/login'

	, API_EMAIL_REQUEST : URL + '/signup/email/request'
	, API_SIGNUP : URL + '/signup/signup'
}

export { 
	API
}
