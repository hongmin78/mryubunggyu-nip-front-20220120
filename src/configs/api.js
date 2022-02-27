
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
	, API_QUERY_REFERER : URL + '/queries/singlerow' // /:tablename/:fieldname/:fieldval
	, API_QUERY_USERADDRESS : URL + '/queries/singlerow' 
	, API_PREMIUMITEMS : URL + '/queries/rows'
}

export { 
	API
}
