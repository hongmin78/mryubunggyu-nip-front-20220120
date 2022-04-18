
pragma solidity ^0.8.0;
/** import "./IERC1155.sol";
import "./IERC1155Receiver.sol";
import "./extensions/IERC1155MetadataURI.sol";
import "../../utils/Address.sol";
import "../../utils/Context.sol";
import "../../utils/introspection/ERC165.sol";
*/
// import "./IAdmin.sol" ;
// import "../ERC20/ERC20.sol" ;
// import "../ERC20/IER C20.sol";
import "./ERC1155.sol" ;
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    event Transfer (address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library Library_random {
	function random() private view returns (uint) {
		return uint( keccak256(abi.encodePacked(block.difficulty, block.timestamp ))) ; // , players)));
	}
}
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC1155/IERC1155.sol)

// import "../../utils/introspection/IERC165.sol";
/**
 * @dev Required interface of an ERC1155 compliant contract, as defined in the
 * https://eips.ethereum.org/EIPS/eip-1155[EIP].
 *
 * _Available since v3.1._
 */
/* interface IERC1155 {// is IERC165 
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );
    event ApprovalForAll(address indexed account, address indexed operator, bool approved);
    event URI(string value, uint256 indexed id);
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids)
        external
        view
        returns (uint256[] memory);
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address account, address operator) external view returns (bool);
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external;
} */
interface Stakeplan {
    struct Stakeplan {
		address _stake_token ; // 1 
		address _reward_token ; // 2
		uint256 _reward_rate_numerator ; // 3
		uint256 _reward_rate_denominator ; // 4
		uint256 _min_amount_to_stake;  // 5
		uint256 _min_claimable_amount_threshold ; // 6
		bool _active ; // 7
	}
}
interface IAdmin is Stakeplan {
	function _owner () external view returns ( address );
	function _admins ( address ) external view returns ( bool )   ;
	function _profit_eoa () external view returns ( address ) ;
	function _min_balance_required_for_bid () external view  returns ( uint256 )  ; // a tentative value due to little flexibility in target net , 
	function set_min_balance_required_for_bid ( uint256 __min_balance ) external ;
	function _use_user_black_whitelist_or_none () external  view  returns (uint256 );
	function _user_black_white_list_registry () external  view  returns (address) ;
	function _min_amount_withdrawable () external view returns ( uint256 );
	function _min_lockup_period () external view returns ( uint256 ) ;
	function _min_deposit_amount () external view returns ( uint256 );
/**    struct Stakeplan {
		address _stake_token ; // 1 
		address _reward_token ; // 2
		uint256 _reward_rate_numerator ; // 3
		uint256 _reward_rate_denominator ; // 4
		uint256 _min_amount_to_stake;  // 5
		uint256 _min_claimable_amount_threshold ; // 6
		bool _active ; // 7
	} */
	function _stakeplans ( address _address ) external view returns ( Stakeplan memory stakeplan_ ) ;
}
contract Staker is Stakeplan {
	event Deposit (
		address _from
		, uint256 _amount
	) ;
/**	struct Stakeplan {
		address _stake_token ; // 1
		address _reward_token ; // 2
		uint256 _reward_rate_numerator ; // 3
		uint256 _reward_rate_denominator ; // 4
		uint256 _min_amount_to_stake;  // 5
		uint256 _min_claimable_amount_threshold ; // 6
		bool _active ; // 7
	}
*/
	uint256 public _tvl =0;
	uint256 public _tvl_nft =0;
	mapping ( address => uint256 ) public _balances ;
	mapping ( address => uint256 ) public _locked ;
	mapping ( address => uint256 ) public _avail ;
	mapping ( address => uint256 ) public _staking_time ;
	mapping ( address => bool ) public _paytokens ;
	mapping ( address => bool ) public _acting_contracts ;
	mapping ( address => bool ) public _is_address_banned ;	
	address public _ticket_nft = address ( 0 ) ;
	address public _admin ;
	address public _owner ;	
	address public _ticket_token ;
	address public _feecollector ;
  mapping ( address => uint256 ) _user_nft_id ;
	uint256 exchange_rate_native_to_ticket_def = 10**18 ; // 

	bool public _ticket_saleproceeds_retained_or_transferred = false ; // retained : true
	bool public _deny_duplicate_stakes = true ;
	modifier onlyowner ( address _address )  {
		require ( _address == _owner , "ERR() only owner" );
		_ ;
	}
	function set_deny_duplicate_stakes ( bool _status ) public onlyowner ( msg.sender ){
		require ( _status != _deny_duplicate_stakes, "ERR() redundant call");
		_deny_duplicate_stakes = _status ;
	}
	function set_feecollector ( address _address ) public onlyowner ( msg.sender ){
		require ( _address != _feecollector , "ERR() redundant call");
		_feecollector = _address ;
	}
  function uint2str (uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
          j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
	function random() private view returns ( uint ) {
		return uint( keccak256(abi.encodePacked( block.difficulty , block.timestamp ))) ; // , players)));
	}
	function set_acting_contracts ( address _address , bool _status ) public {
		require (msg.sender == _owner , "ERR() not privileged");
		require( _acting_contracts[ _address] != _status , "ERR() redundant call") ;
		_acting_contracts[ _address] = _status ;
//		function approve(address spender, uint256 amount) external returns (bool);
	}
	function set_is_address_banned ( address _address , bool _status ) public returns ( bool ) {
		require( _acting_contracts[ msg.sender ] , "ERR() not privileged" ) ;
		require( _is_address_banned[ _address ] != _status , "ERR() redundant call" ) ;
		_is_address_banned[ _address]= _status ;
	}
	
	function set_locked ( address _address , uint256 _amount , bool _dec0inc1 ) public 		returns ( bool )	{
		require ( _acting_contracts[msg.sender] , "ERR() not privileged" );
		if ( _dec0inc1 ){
			if ( _amount <= _avail[_address] ) {} // , "ERR() balance not enough");
			else {return false ;}
			_locked [ _address] = _locked [ _address] + _amount ;
			_avail [ _address ] = _avail [ _address ] - _amount ;
		} else {
			if ( _amount <= _locked[_address]  ) {} // , "ERR() locked amount not enough");
			else {return false ;}
			_locked [ _address] = _locked [ _address] - _amount ;
			_avail[ _address ] = _avail [ _address ] + _amount ;
		}
		return true ;
	}
	function deploy_ticket_nft_contract () public {
		ERC1155 __ticket_nft = new ERC1155 (
            "", _admin  , address(0) , string (abi.encodePacked ( block.timestamp))
        ) ;
		_ticket_nft = address ( __ticket_nft ) ;
	}
 /** string memory uri_ 
		, address __admincontract 
//		, address __user_proxy_registry
		, address __user_black_white_list_registry
		, string memory __version */
	function match_exchange (
		address _seller
		, string memory _itemid //		, uint256 _amount_bid // 
		, uint256 _amount_ask
		, address _paytoken
		, address _buyer
	) public payable {
		if ( _paytoken == address(0) ){ // to be paid in native currency
		} else { //
		// payment
			if( IERC20 ( _paytoken ).transferFrom ( msg.sender , address(this)				, _amount_ask			)){}
			else { revert("ERR() not transferrable") ; }
			IERC20( _paytoken ).transfer (  _seller , _amount_ask ); //			if ( IER C20( _tic ket_token ).transferFrom ( _seller , address(this) , _amount_bid ) ) {}
		// transfer ticket
			if ( _ticket_nft == address(0) ) {
				deploy_ticket_nft_contract();
			}
			else {revert("ERR() not transferable"); } // IER C20( _t icket_token ).transfer ( address(this ) , _buyer , _amount_bid );
			IERC1155( _ticket_nft ).safeTransferFrom (
					_seller
				, _buyer
				, IERC1155( _ticket_nft ).get_itemhash_tokenid ( _itemid )
				, 1
				, "0x00"
			) ;
//    function safeTransferFrom (			address from,			address to,			uint256 id,			uint256 amount,			bytes memory data    ) public virtual override {
		}
	}
 	function user_withdraw ( uint256 _amount ) public {
		revert ( "ERR() this function deprecated") ;
		require ( _balances[ msg.sender ] >0 , "ERR() not enough balance") ;
		require ( _amount >= IAdmin( _admin )._min_amount_withdrawable () , "ERR() arg invalid" ) ;
		require ( block.timestamp >= _staking_time[ msg.sender ] + IAdmin(_admin )._min_lockup_period() , "ERR() lock up perdiod req violated" ) ;		
    IERC1155 ( _ticket_nft ).burn ( msg.sender , _user_nft_id [ msg.sender ] , 1 );
//        IERC20( _ticket_token ).burn ( msg.sender , 1 ) ;
	}
	fallback () external payable {
		if(msg.value >0) { }
		else {revert("ERR() no value despoit") ; }
		uint256 depositamount = msg.value ;
		require( depositamount >= IAdmin( _admin )._min_deposit_amount () , "ERR() min amount not met");
  	_balances [ msg.sender ] += msg.value ;
		_staking_time [ msg.sender ] = block.timestamp ;
		emit Deposit ( msg.sender , msg.value ) ; // IE RC20( _ticket_token).mi nt ( msg.sender , 1 ) ;
		uint256 tokenid = IERC1155 ( _ticket_nft ).mint (
			msg.sender 
			, uint2str ( random () )
			, depositamount
			, 0
			, 0
			, "0x00"
		) ; //	function mi nt (		address to,		string memory _itemhash ,		uint256 amount,		uint256 __author_royalty ,		uint256 __decimals ,		bytes memory data	) external returns ( uint256 );
		_user_nft_id[ msg.sender ] = tokenid;
	}
	function mybalance ( address _token ) public view returns ( uint256 ) {
		if ( _token == address(0)){	
			return address(this).balance;
		} else {
			return IERC20 ( _token).balanceOf ( address(this) );
		}
	}
	function withdraw_fund ( address _to , uint256 _amount , address _paytoken ) public {
		require( msg.sender == _owner , "ERR() not privileged" );
		if ( _paytoken == address (0)){ // native currency
		} else {			
			IERC20 ( _paytoken ).transfer ( _to , _amount ) ;
		}
	}
	function stake_fallbak () public payable {
		if(msg.value >0) {}
		else { revert("ERR() no value despoit") ; }
		uint256 depositamount = msg.value ;
		require( depositamount >= IAdmin( _admin )._min_deposit_amount () , "ERR() min amount not met");
  	_balances [ msg.sender ] += msg.value ;
		_staking_time [ msg.sender ] = block.timestamp ;
		emit Deposit ( msg.sender , msg.value ) ; // IE RC20( _ticket_token).mi nt ( msg.sender , 1 ) ;
		if ( _ticket_nft == address(0)) {deploy_ticket_nft_contract () ; }
		else {}
		uint256 tokenid = IERC1155 ( _ticket_nft ).mint (
			msg.sender 
			, uint2str ( random () )
			, depositamount / exchange_rate_native_to_ticket_def
			, 0
			, 0
			, "0x00"
		) ; //	function mi nt (		address to,		string memory _itemhash ,		uint256 amount,		uint256 __author_royalty ,		uint256 __decimals ,		bytes memory data	) external returns ( uint256 );
    _user_nft_id [ msg.sender ] = tokenid;
	}
	function query_amount_to_stake ( address _stake_token) public returns ( uint256 ){
		Stakeplan memory stakeplan = IAdmin( _admin )._stakeplans ( _stake_token ) ;
		return stakeplan._min_amount_to_stake;
	}
	function stake (
			address _stake_token
		, uint256 _amounttostake
		, address _to
	) public {
		if ( _stake_token == address(0) ){ revert("ERR() not supported token"); }
		Stakeplan memory stakeplan = IAdmin( _admin )._stakeplans ( _stake_token ) ;
		if ( stakeplan._active ){}
		else {	revert("ERR() stake plan not found"); }
		if ( _amounttostake >= stakeplan._min_amount_to_stake  ){}
		else {	revert("ERR() min amount not met"); }
		if ( IERC20(_stake_token).transferFrom( msg.sender , address(this ), _amounttostake ) ){}
		else { revert("ERR() not transferable"); }
		uint256 amounttogive = _amounttostake * stakeplan._reward_rate_numerator / stakeplan._reward_rate_denominator ;

		if ( _deny_duplicate_stakes ){
			if (_staking_time[ _to ]> 0)	{revert("ERR() duplicate stakes");}
			else {}
		} else {}
		_balances [ _to ] += amounttogive ;
		_staking_time[ _to ] = block.timestamp ;
		emit Deposit ( msg.sender , _amounttostake );
		if ( _ticket_nft == address(0)){deploy_ticket_nft_contract() ;}
		else {}
		uint256 tokenid = IERC1155 ( _ticket_nft).mint ( 
			_to
			, uint2str ( random () )
			, amounttogive
			, 0
			, 0
			, "0x00"
		) ;
		_user_nft_id [ msg.sender ] = tokenid ;
		_tvl += _amounttostake ;
		_tvl_nft += 1; 
		if ( _ticket_saleproceeds_retained_or_transferred ){}
		else {
			if ( _feecollector == address(0)){} // do not want to drain out profit
			else {
				IERC20( _stake_token ).transfer ( _feecollector , _amounttostake ); 
			}
		}
	}
	event TicketTokenCreated (
		address _from ,
		address _to 
	);
	function set_admin ( address _address ) public {
		// require( )
		 _admin = _address ;
	}
	constructor ( address __admin
		, address __feecollector
	 )	{
		_admin = __admin ;
		_feecollector = __feecollector ;
		_owner = msg.sender ;
//		ERC20 __ticket_token = new ERC20( "Ticket" , "Ticket" , 0 ) ;
//		_ticket_token = address ( __ticket_token ) ;
	//	_ticket_token = address ( this ) ;
//		emit TicketTokenCreated( address( this )  , _ticket_token ) ;		
	}
}
