pragma solidity ^0.5.6;
// import "./IKIP17.sol";
// import "https://github.com/chainlabs21/akfriends-contract-mrna-20220328/blob/master/contracts/token/KIP17/IKIP17.sol";
// import "./KIP17.sol";
// import "https://github.com/chainlabs21/akfriends-contract-mrna-20220328/blob/master/contracts/token/KIP17/KIP17.sol";
// import "./KIP17Enumerable.sol";
import "https://github.com/chainlabs21/akfriends-contract-mrna-20220328/blob/master/contracts/token/KIP17/KIP17Enumerable.sol";
// import "./KIP17Metadata.sol";
import "https://github.com/chainlabs21/akfriends-contract-mrna-20220328/blob/master/contracts/token/KIP17/KIP17Metadata.sol";
// import "./KIP17Mintable.sol";
import "https://github.com/chainlabs21/akfriends-contract-mrna-20220328/blob/master/contracts/token/KIP17/KIP17Mintable.sol";
// import "./KIP17Burnable.sol";
import "https://github.com/chainlabs21/akfriends-contract-mrna-20220328/blob/master/contracts/token/KIP17/KIP17Burnable.sol";
// import "./IKIP17Receiver.sol";
import "https://github.com/chainlabs21/akfriends-contract-mrna-20220328/blob/master/contracts/token/KIP17/IKIP17Receiver.sol";
 
/**
 * @title Full KIP-17 Token
 * This implementation includes all the required and some optional functionality of the KIP-17 standard
 * Moreover, it includes approve all functionality using operator terminology
 * @dev see http://kips.klaytn.com/KIPs/kip-17-non_fungible_token
 */
/** interface IKIP17  is IKIP13 { //
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    function balanceOf(address owner) public view returns (uint256 balance);
    function ownerOf(uint256 tokenId) public view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) public;
    function transferFrom(address from, address to, uint256 tokenId) public;
    function approve(address to, uint256 tokenId) public;
    function getApproved(uint256 tokenId) public view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) public;
    function isApprovedForAll(address owner, address operator) public view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public;
*/
interface IKIP17_2 {
    function _itemhash_tokenid ( string calldata _itemid ) external view returns ( uint256 ) ;
	function mint (
			address _seller // _sell er
			, string calldata _itemid
			, uint256 _amounttomint // _am ount
			, uint256 _author_royalty
			, uint256 _decimals // 0 // _decimals
			, bytes calldata _data
			) external returns ( uint256 );
} 

 interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender
			, address recipient
			, uint256 amount
		) 		external returns (bool);
		function mint ( address _to , uint256 _amount  ) external returns ( bool );
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
contract Random {
	function random() public view returns (uint) {
			// sha3 and now have been deprecated
			return uint(keccak256(abi.encodePacked( block.difficulty , block.timestamp )));
			// convert hash to integer
			// players is an array of entrants			
	}
}
contract KIP17FullStakeEmploy is KIP17
	, KIP17Enumerable
	, KIP17Metadata
	, KIP17Mintable
	, KIP17Burnable , Random
	, IKIP17Receiver
{
	address public _reward_token ;
	uint256 public _reward_amount = 1 * 10**18 ;
	address public _owner ;
  address public _vault ;
	uint256 public _unit_reward_amount = 374  * 10**15 ; // =0.263263
	uint256 public _cumul_claim_amount = 0 ;
	mapping (address => mapping ( uint256 => uint256 )) public _deposit_time ; // user => token id => timestamp
	mapping (address => mapping ( uint256 => uint256 )) public _withdraw_time ; // 
	mapping ( address=> uint256) public _claimed_amounts ;
	mapping (address => uint256 ) _claim_time ;
	constructor (string memory name
		, string memory symbol
		, address __reward_token
  //  , address __vault 
	) public KIP17Metadata(name, symbol) { // solhint-disable-previous-line no-empty-blocks
		_owner = msg.sender ;
		_reward_token = __reward_token;
//    _vault = __vault ;
//		addMinter ( address(this) ) ;
//		for (uint256 i=1; i<=5; i++ ) { mint( address(0x5c7552f154D81a99e2b5678fC5fD7d1a4085d8d7) , i ) ;}
//		for (uint256 i=6; i<=13; i++ ) { mint( address(0xCF529119C86eFF8d139Ce8CFfaF5941DA94bae5b) , i ) ;}
	}
	function onKIP17Received(address operator, address from, uint256 tokenId, bytes memory data)
    public returns (bytes4){
//		return bytes4(keccak256("onKIP17Received(address,address,uint256,bytes)"));
//		return bytes4(keccak256("onKIP17Received(operator,from, uint256 tokenId, bytes memory data)"));
    return this.onKIP17Received.selector;
	}
  modifier onlyowner ( address _address ) {
    require( _address == _owner , "ERR() not privileged");
    _;
  }
  function set_vault ( address _address ) public onlyowner( msg.sender ) {
    require( _address != _vault , "ERR() redundant call");
    _vault = _address ;
  }
/*  function _ensure_amount_from_myself_or_vault ( address _token , address _vault , uint256 _amount ) internal {
    if ( IERC20( _token ).balanceOf ( address( this) ) >= _amount ){
    } else if ( _vault == address(0) ){ revert("ERR() reserve not enough"); }
    else if ( IERC20( _vault ).balanceOf( address (this) ) >= _amount ){
      IERC20( _token ).transferFrom ( _vault , address(this) , _amount );
    }else {revert("ERR() reserve low");}
  } */
/**  function _ensure_erc721_token_from_myself_or_vault ( address _erc721 , address _vault , uint256 _tokenid ) internal {
    if ( IKIP17(_erc721).ownerOf( _tokenid) == address(this) ){}
    else if ( _vault == address(0)){  revert("ERR() vault does not hold token");}
    else if ( IKIP17(_erc721 ).ownerOf(_tokenid) == _vault ){
      IKIP17( _erc721 ).transferFrom ( _vault , address(this) , _tokenid );
    } else {  revert("ERR() reserve low");
    }
  }*/
	function set_unit_reward_amount (uint256 _amount ) public {
  	require ( msg.sender == _owner , "ERR() not privileged") ;
		require ( _amount != _unit_reward_amount , "ERR() redundant call" );
		_unit_reward_amount = _amount ;
	}
	function query_claimable_amount ( address _address ) public view returns ( uint ){
		uint256 heldamount = balanceOf ( _address) ;
		if ( heldamount == 0){return 0; }
		uint256 claimable_amount = 0;
		uint256 claimtime = _claim_time[ _address ];
		if ( claimtime > 0 ){
			for ( uint256 idx = 0; idx < heldamount ; idx ++){
				claimable_amount += _unit_reward_amount * ( block.timestamp - claimtime ) / 3600 / 24 ;
			}
		} else {
			for ( uint256 idx = 0; idx < heldamount ; idx++){
				uint256 tokenid = tokenOfOwnerByIndex( _address , idx );
				claimable_amount += _unit_reward_amount * ( block.timestamp - _deposit_time[ _address][ tokenid ]) / 3600 /24 ;
			}
		}
		return claimable_amount ;
	}
//     function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256 tokenId);
	function query_claimable_amount_dummy ( address _address ) public view returns ( uint ) {
		return random()%_reward_amount ; 
	}
	event Claim (		address _address , uint256 _amount 
	) ;
	function claim () public {
		uint256 claimable_amount = query_claimable_amount ( msg.sender ) ;
//    _ensure_amount_from_myself_or_vault( _reward_token , _vault, claimable_amount );
		if ( _vault == address(0 )){}
		else {
			if(IERC20( _reward_token ).allowance( _vault, address(this)  ) >=claimable_amount ){
			   IERC20( _reward_token ).transferFrom ( _vault , address(this ), claimable_amount );
			} else {}
		}
		IERC20( _reward_token ).transfer( msg.sender , claimable_amount ) ;
		_cumul_claim_amount += claimable_amount ;
		_claim_time [ msg.sender ]  = block.timestamp ;
		_claimed_amounts [ msg.sender ] += claimable_amount;
		emit Claim ( msg.sender , claimable_amount ) ;
	}
	function claim_dummy ( ) public {
		IERC20 ( _reward_token ).transfer ( msg.sender , _reward_amount ) ;
		_claim_time [ msg.sender ]  = block.timestamp ;
	}
	function query_pending_reward () public view returns ( uint ) {
		return random()%_reward_amount ; 
	}
	function query_claimed_reward () public view returns ( uint ) {
		return _cumul_claim_amount ;
	}
	function query_claimed_reward_dummy () public view returns ( uint ) {
		return random() % _reward_amount ;
	}
	function set_reward_token ( address _address ) public {
  	require ( msg.sender == _owner , "ERR() not privileged") ;
		require ( _address != _reward_token , "ERR() redundant call" );
    _reward_token = _address ;
  }
/********* */
	function withdraw ( address _erc721 , uint256 _tokenid , address _to ) public {
  //  _ensure_erc721_token_from_myself_or_vault( _erc721, _vault, _tokenid );
		KIP17 (_erc721).safeTransferFrom ( address ( this ) , _to , _tokenid );
		burn ( _tokenid ) ;
		_withdraw_time [ msg.sender ] [ _tokenid ] = block.timestamp ;
//		IKIP17 ( _erc721 ).transfer ( _to , _tokenid ) ;
//		emit Withdraw ( _erc721 , _tokenid ) ;
	}
	function withdraw_batch ( address _erc721 , uint256 [] memory _tokenids , address _to ) public {
		uint256 N = _tokenids.length ;
		for ( uint256 i = 0 ; i<N;i++){
			uint256 tokenid = _tokenids[ i ] ;
//      _ensure_erc721_token_from_myself_or_vault( _erc721, _vault, tokenid );
			KIP17 (_erc721).safeTransferFrom ( address ( this ) , _to , tokenid );
			burn ( tokenid ) ;
			_withdraw_time [ msg.sender ] [ tokenid ] = block.timestamp ;
//			_balances [msg.sender][ _tokenids [ i ] ] = 0 ;
//			IKIP17( _erc721 ).transfer ( _to , _tokenids[ i ]) ;
		}
//		emit Withdraw ( _erc721 , _tokenids[ 0 ] ) ;
	}
/********* */
	function mint_deposit ( address _erc721 
		, string memory _itemid
		, uint256 _author_royalty
	 ) public {
        uint256 tokenid ;
		if ( ( tokenid = IKIP17_2 ( _erc721 )._itemhash_tokenid( _itemid ) ) == 0 ) {
			tokenid = IKIP17_2 ( _erc721 ).mint (
			msg.sender // _sell er
			, _itemid
			, 1 // _amounttomint // _am ount
			, _author_royalty
			, 0 // _decimals //  // _decimals
			, "0x00"
			) ;
		} else {
			tokenid = IKIP17_2 ( _erc721 )._itemhash_tokenid ( _itemid ) ;
		}
		IKIP17 ( _erc721).safeTransferFrom ( msg.sender , address(this) , IKIP17_2 ( _erc721 )._itemhash_tokenid( _itemid ), "0x00") ;		
		mint ( msg.sender , IKIP17_2 ( _erc721 )._itemhash_tokenid( _itemid ) ) ;
		_deposit_time [ msg.sender ][ IKIP17_2 ( _erc721 )._itemhash_tokenid( _itemid ) ] = block.timestamp ;
/**	    if (_vault == address(0)){}
    	else {
      		IKIP17 ( _erc721).safeTransferFrom ( address(this) , _vault , tokenid , "0x00" );
    	} */
	}
	function deposit ( address _erc721, uint256 _tokenid ) public {
		IKIP17 ( _erc721).safeTransferFrom ( msg.sender , address(this) , _tokenid , "0x00") ;		
//		_balancesums [ msg.sender ] += 1; 
	//	_balances [msg.sender][ _tokenid] = 1;
		mint ( msg.sender , _tokenid ) ;
//function mint(address to, uint256 tokenId)
//    IKIP17 ( _erc721 ).approve ( msg.sender , _tokenid ) ;
// approve (msg.sender , _tokenid );
//		addMinter ( msg.sender ) ;
//		_count_deposited += 1 ;
//    if ( IERC20( _reward_token ).balanceOf( address(this) ) >= _reward_amount ) {
//    	IERC20 (_reward_token).transfer ( msg.sender , _reward_amount ) ;
  //  }
	// else {}
		_deposit_time [ msg.sender ][ _tokenid ] = block.timestamp ;
    if (_vault == address(0)){}
    else {
      IKIP17 ( _erc721).safeTransferFrom ( address(this) , _vault , _tokenid , "0x00" );
    }
//		emit Deposit ( _erc721 , _tokenid );
	}
	function deposit_batch ( address _erc721 , uint256 [] memory _tokenids ) public {
		uint256 N= _tokenids.length;
		for (uint256 i=0; i< N ; i++) {
      uint256 tokenid = _tokenids[ i ] ;
			IKIP17 (_erc721).safeTransferFrom ( msg.sender , address ( this), tokenid , "0x00" ) ;
			mint ( msg.sender , tokenid ) ;
//			_balances [msg.sender][ tokenid ] = 1;
// approve (msg.sender , tokenid );
	//		IKIP17 ( _erc721 ).approve ( msg.sender , tokenid ) ;
			_deposit_time [ msg.sender ][ tokenid ] = block.timestamp ;
      if(_vault == address(0)){}
      else{
        IKIP17 ( _erc721).safeTransferFrom ( address(this) , _vault , tokenid , "0x00" );
      }
		}
//		addMinter ( msg.sender ) ;
//		_count_deposited += N ;
//    if ( IERC20( _reward_token ).balanceOf( address(this) ) >=_tokenids.length * _reward_amount ) {
//    	IERC20 (_reward_token).transfer ( msg.sender , _tokenids.length *  _reward_amount ) ;
//		}
//		else {}
//		_balancesums [ msg.sender ] += N ;
//		emit Deposit ( _erc721 , _tokenids[ 0 ] );
	}
  function mybalance ( address _token ) public view returns ( uint256 ){ 
		return IERC20( _token ).balanceOf ( address ( this ) );
  }
  function allowance ( address _token , address _holder ) public view returns (uint256) {
	  return IERC20 ( _token).allowance ( _holder , address(this ));
  }
	function withdraw_fund ( address _token , address _to , uint256 _amount ) public {
  	require (msg.sender == _owner , "ERR() not privileged") ;
    IERC20( _token ).transfer ( _to , _amount );
	}
}