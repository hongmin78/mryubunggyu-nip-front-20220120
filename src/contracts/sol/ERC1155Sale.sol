// pragma solidity ^0.8.0;
pragma solidity>=0.8.0;
<<<<<<< HEAD
// import "./ERC1155.sol"; 
// import "./presets/ERC1155PresetMinterPauser.sol" ;
// import "./IERC1155.sol" ;
// import "../ERC20/IERC20.sol" ;
// SPDX-License-Identifier: MIT
=======

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
<<<<<<< HEAD
/**  contract adminconfigs {
	uint256 external _mindeltabid ;
	function getmindeltabid() returns (uint256){
		return _mindeltabid ;
	}
} */
=======

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
interface IAdmin_nft {
	function isadmin( address ) external view returns (uint );
	function get_admin_fee (string memory _action ) external view returns (uint ) ;
	function is_originatorfee_in_validrange(uint _queryvalue) external returns (bool);
	function getminsalesprice(address _paymeans) external view returns (uint256 ) ;
	function _map_action_int_adminfee_inbp(uint) external view returns (uint);
	function query_admin_fee (string memory _action ) external view returns (uint ) ;
	function getpaymeansstatus (address _paymeans 	)		external view returns (uint);
	function _feecollector () external view returns (address)	;
	function _originator_feeinbp_range (uint _index) external view returns (uint);
	function query_admin_fees ()        external view returns 	(string [] memory , uint[] memory  ) ; // OOO
	function set_admin_fee (string memory _action , uint _feeinbp) external  ;
	function setadminaddressstatus ( address _address , uint _status ) external ;
	function disable_fees () external ;
	function _vault () external view returns ( address ) ;
}
interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
abstract contract ERC165 is IERC165 {
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}
interface IERC1155Receiver is IERC165 {
// abstract contract IERC1155Receiver is IERC165 {
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    )        external virtual returns(bytes4);
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    )        external virtual returns(bytes4);
}
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
<<<<<<< HEAD

=======
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
    function _msgData() internal view virtual returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}
abstract contract Ownable is Context {
    address public _owner; // private
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }
    function owner() public view virtual returns (address) {
        return _owner;
    }
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}
interface IERC1155  { // is IERC165
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values);
    event ApprovalForAll(address indexed account, address indexed operator, bool approved);
    event URI(string value, uint256 indexed id);
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view returns (uint256[] memory);
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address account, address operator) external view returns (bool);
    function safeTransferFrom(address from
			, address to
			, uint256 id
			, uint256 amount
			, bytes calldata data) external;
    function safeBatchTransferFrom(address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data) external;
    function _map_itemid_tokenid ( string memory ) external view returns ( uint256 );
    function get_next_tokenid_counter () external view returns ( uint256 );
    function mint ( address 
				, uint256// get_current_tokenid_counter ( )
				, uint256
				, bytes memory // , IERC1155 (_mintinfo._targ et_contract).increment_tokencount_assign ()
    ) external;
	function mint (
<<<<<<< HEAD
			address _author // _sell er
=======
			address _seller // _sell er
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
			, string memory _itemid
			, uint256 _amounttomint // _am ount
			, uint256 _author_royalty
			, uint256 _decimals // 0 // _decimals
			, bytes memory
	) external  returns (uint256 );
	function _itemhash_tokenid ( string memory ) external view returns ( uint256 );
	function _author_royalty ( uint256 ) external view returns ( uint256 ) ;
<<<<<<< HEAD
	function _author ( uint256 ) external view returns ( address ) ;
}
/**  interface Mint {
	struct Mint {
		address _target_contract; 
		address _minter ;
		string _itemid ;
		uint256 _amount ;
		uint256 _decimals ;
	}
}
interface Sale {
	struct Sale {
		address _target_contract; 
		address _seller;
		string _itemid ;
		uint256 _tokenid ;
		uint256 _amount ;
		address _payment_token ;
		uint256 _price ; // payment amount
		uint256 _expiry ;
	}
}
interface Bid {
	struct Bid {
		address _target_contract; 
		address _bidder ;
		string _itemid ;
		uint256 _tokenid ;
		uint256 _target_amount ;
		uint256 _bid_amount ;
		uint256 _bidcount ;
	}
}*/
=======
	
}

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
contract ERC1155Sales is  // Mint 	, Sale 	,
  IERC1155Receiver , ERC165 , Ownable
	{ // ERC1155, ERC1155PresetMinterPauser
	address public _admincontract ;
//	address public _owner ;
	constructor (address __admincontract) {
		_admincontract = __admincontract ;
		_owner = msg.sender ;
	}
	function set_admincontract(address _address) public {
		require ( _address != _admincontract , "ERR() redundant call" );
		 _admincontract = _address ;
	}
	function onERC1155Received(
		address operator,
		address from,
		uint256 id,
		uint256 value,
		bytes calldata data
  ) public override        returns(bytes4){
			return this.onERC1155Received.selector ;
		}
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    	) public override         returns(bytes4){
			return this.onERC1155BatchReceived.selector ;
	}

	function makepayment ( address _paymeans
		, uint256 _amounttopay
		, address _receiver
	) internal {
		if ( _paymeans == address(0)){
			payable( _receiver).call {value : _amounttopay } ("");
		}
		else {
			IERC20 ( _paymeans).transfer ( _receiver , _amounttopay ) ;
		}
	}
	uint256 public _flowsel = 1 ;
	function set_flowsel ( uint256 __flowsel ) public {
		require (_flowsel != __flowsel , "ERR() redundant call");
		_flowsel =	__flowsel ;
	}
	struct Mint_info {
		address _target_erc1155_contract ;// 0
		 string _itemid ; //1 //		, uint256 _tokenid // 2 ignored for now
		 uint256 _amounttomint ;// 2 
		 uint256 _decimals ;// 3
     uint256 _author_royalty; // 4 //        , uint256 _decimals // 5  //		, address _paymeans // 6
<<<<<<< HEAD
		 address _author ;// 5
=======
		 address _seller ;// 5
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
	}
	struct Sale_info {
		 uint256 _amounttobuy ; // 6
		 uint256 _amounttopay ;// 7 //		, uint256 _pr ice // 7
		 address _paymeansaddress; // 8
		 address _seller ;// 9
	}
	function mint_and_match_single_simple_with_signature ( 
		Mint_info memory mint_info
		, Sale_info memory sale_info
	) public payable {
	}
//	modifier onlyowner ( address _address ) { require ( _address == _owner , "ERR() only owner") ; }
	bool public _is_function_mint_and_match_single_simple_legacy = true ;
	function set_function_mint_and_match_single_simple_legacy ( bool _status ) public onlyOwner { //  ( msg.sender )
		require ( _status != _is_function_mint_and_match_single_simple_legacy , "ERR() redundant call" ) ;
		_is_function_mint_and_match_single_simple_legacy = _status ;
	}
<<<<<<< HEAD
	function mint_and_match_single_simple_legacy (
		address _target_erc1155_contract // 0
		, string memory _itemid //1 //		, uint256 _tokenid // 2 ignored for now
		, uint256 _amounttomint // 2 
		, uint256 _decimals // 3
    , uint256 _author_royalty // 4 //        , uint256 _decimals // 5  //		, address _paymeans // 6
		, address _author // 5
=======
	uint256 public _admin_fee =288 ;
	function set_admin_fee( uint256 __admin_fee) public {
		_admin_fee = __admin_fee ;
	}
	uint256 public _referer_feerate= 12 ;
	function set__referer_feerate( uint256 __referer_fee) public {
		_referer_feerate = __referer_fee ;
	}
	function get_admin_fee() public returns ( uint256){		return _admin_fee ;
	}
	address public _feecollector_for_sales  ;
	function set_feecollector_for_sales ( address __feecollector_for_sales ) public {
		_feecollector_for_sales = __feecollector_for_sales ;
	}
	
	function mint_and_match_single_simple_legacy (
		  address _target_erc1155_contract // 0
		, string memory _itemid //1 //		, uint256 _tokenid // 2 ignored for now
		, uint256 _amounttomint // 2 
		, uint256 _decimals // 3
        , uint256 _author_royalty // 4 //        , uint256 _decimals // 5  //		, address _paymeans // 6
		, address _referer // 5
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
		, uint256 _amounttobuy // 6
		, uint256 _amounttopay // 7 //		, uint256 _pr ice // 7
		, address _paymeansaddress // 8
		, address _seller // 9
<<<<<<< HEAD
//		, address _to // 9
//		, address _referer // 10
	) public payable {
//		require( _t o != address(0) , "ERR() invalid beneficiary" );
=======
	) public payable {

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
		require ( _is_function_mint_and_match_single_simple_legacy , "ERR() function not accessible");
		require( _seller != address(0) , "ERR() invalid seller" );
		uint256 tokenid ; // 10
		if ( ( tokenid = IERC1155( _target_erc1155_contract)._itemhash_tokenid( _itemid ) ) == 0 ){
			tokenid = IERC1155( _target_erc1155_contract ).mint (
<<<<<<< HEAD
			_author // _sell er
=======
			_seller // _sell er
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
			, _itemid
			, _amounttomint // _am ount
			, _author_royalty
			, _decimals // 0 // _decimals
			, "0x00"
			) ;
		} else {
		}
		/******* settlement */ //		
<<<<<<< HEAD
		uint256 remaining_amount;  // order_buy.asset_amount_bid[0] ;
=======
		uint256 remaining_amount;  
        IERC20( _paymeansaddress ).transferFrom ( msg.sender , address( this ), _amounttopay );
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
		if ( _paymeansaddress == address(0) ) {
			require( msg.value >= _amounttopay , "ERR() declared value inconsistent") ;
 			remaining_amount = _amounttopay ; // msg.value ;
		}
		else {
			if( IERC20( _paymeansaddress ).transferFrom ( msg.sender , address( this ), _amounttopay )){}
			else { revert("ERR() price not met"); }
			remaining_amount = _amounttopay ;
		}
<<<<<<< HEAD
//			uint256 msg.value = msg.value; // order_buy.asset_amount_bid [ 0 ] ; // msg.value ;
	//		if( remaining_amount >= order_sell.asset_amount_ask [ 0]  ){} // asset_price[ 1 ]
		//	else { revert( "ERR() price not met" ); return; }
			/****  admin */
			uint256 admin_fee_rate = IAdmin_nft( _admincontract ).get_admin_fee( "MATCH" ) ; // get_admin_fee
//			if(_admin_fee_rate > 0 ){	admin_fee_rate = _admin_fee_rate ; }
//			else {}
			uint256 admin_fee_amount = remaining_amount * admin_fee_rate / 10000 ;
      	address vault = IAdmin_nft( _admincontract )._vault() ;
			if ( admin_fee_amount> 0 && vault != address(0) ) { //				if ( ){ revert("ERR() vault address invalid"); }
				makepayment ( _paymeansaddress 
					, admin_fee_amount
					, vault ) ;
/**				emit DepositToVault(
					address(this)
					, admin_fee_amount
					, uint256(SEND_TYPES.ADMIN_FEE_SPOT) 
					, vault
				); */
				remaining_amount -= admin_fee_amount ;
			} else {}
			/**** referer */
//			uint referer_feerate = 100 ; // _referer_feerate ;

			/***** royalty */
//				uint256 tokenid = _tokenid ;// IERC1155 (  ). ; // order_sell.asset_id_bid [ 0 ] ;
			uint author_royalty_rate = IERC1155 ( _target_erc1155_contract )._author_royalty ( tokenid ) ;
				if ( author_royalty_rate > 0 ) {
//					address author = IERC1155 ( _target_erc1155_contract )._author ( tokenid ) ;
					_author = IERC1155 ( _target_erc1155_contract )._author ( tokenid ) ;
					if (_author == address(0)){}
					else {
						uint256 author_royalty_amount = _amounttopay * author_royalty_rate / 10000 ;
//						uint pay_author_when = IAdmin_nft( _admincontract)._PAY_AUTHOR_IMMEDIATE_OR_PERIODIC() ;
						makepayment ( _paymeansaddress
							, author_royalty_amount
							, _author
						)  ;
							// payable( _author ).call { value : author_royalty_amount } ( "" ) ;
/** 						emit PaidFee (
							address(this)
							, author_royalty_amount
							, uint256(SEND_TYPES.AUTHOR_ROYALTY_DEPOSIT) 
							, _author
						);*/						
/**						else if (pay_author_when == uint256(PAY_AUTHOR_IMMEDIATE_OR_PERIODIC.PERIODIC)  )
						{	IPayroll_fees( _payroll ).increment_balance ( author ,1, author_royalty_amount , uint256(Fee_taker_role.AUTHOR) ) ;
							vault_contract.call { value : author_royalty_amount } ( "" ); 
							emit DepositToVault (
								address( this )
								, author_royalty_amount
								, uint256(SEND_TYPES.AUTHOR_ROYALTY_DEPOSIT) 
								, vault_contract
							) ;
						} */
						remaining_amount -= author_royalty_amount ;
					}
				}
				else {}			
			/***** remaining of sales proceeds */
//			payable ( _seller ).call { value : remaining_amount } ("") ;
=======
		

			uint256 admin_fee_amount = remaining_amount * _admin_fee / 10000 ;
     
			if ( admin_fee_amount> 0 ) { //			
				if(_feecollector_for_sales == address(0)){}
                else{
    makepayment ( _paymeansaddress 
					, admin_fee_amount
					, _feecollector_for_sales ) ;
				remaining_amount -= admin_fee_amount ; 
                     } 
                }
            
                else {}
				if ( _referer_feerate > 0 ) {
				
					if (_referer == address(0)){}
					else {
						uint256 referer_fee_amount = remaining_amount * _referer_feerate / 10000 ;
			
						makepayment ( _paymeansaddress
							, referer_fee_amount
							, _referer
						)  ;
						remaining_amount -= referer_fee_amount ;	
					}
				}
				else {}			
>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
			makepayment ( _paymeansaddress 
				, remaining_amount
				, _seller
			) ;
		/*******  */
		if( _flowsel == 2 ){
			IERC1155( _target_erc1155_contract ).safeTransferFrom ( // Batch
			_seller
			, address(this) // _to
				, tokenid
			, _amounttobuy
			, "0x00"
			) ;
			IERC1155( _target_erc1155_contract ).safeTransferFrom ( // Batch
				address(this)
				, msg.sender // _to
				, tokenid
			, _amounttobuy
			, "0x00"
			) ;
		} else if ( _flowsel == 1){
			IERC1155( _target_erc1155_contract ).safeTransferFrom ( // Batch
			  _seller
	    	  , msg.sender // _to
				, tokenid
		    	, _amounttobuy
    			, "0x00"
			) ;
		} else {}
	}
<<<<<<< HEAD
/*	function mint_and_take_ownership (
		Mint memory _mintinfo
		, Sale memory _saleinfo
		, string memory signaturemint
		, string memory signaturesale
//		, Bid memory _bidinfo
	) public payable {
		address minter = _mintinfo._minter ; // IERC1155 ()
		address target_contract = _mintinfo._target_contract;
		address seller =  _saleinfo._seller ;
		address buyer = msg.sender ;
		uint256 tokenid ; // = IERC1155( target_contract ).get_next_tokenid_counter();
		if ( IERC1155( target_contract )._map_itemid_tokenid ( _mintinfo._itemid ) == 0 ){ // how can we tell if item has been minted or not
			tokenid = IERC1155( target_contract ).get_next_tokenid_counter();
			IERC1155( target_contract ).mint (
					minter
				, tokenid // get_current_tokenid_counter ( )
				, _mintinfo._amount
				, "0x00" // , IERC1155 (_mintinfo._targ et_contract).increment_tokencount_assign ()
			) ; // fun ction mint(address to, uint256 id, uint256 amount, bytes memory data) public virtual {
		}
		uint256 price = _saleinfo._price ;
		address payment_token = _saleinfo._payment_token ;
		
		if ( payment_token == address(0) ) {
			if ( msg.value >= price ){}
			else { revert("ERR() price not met-eth"); }
		} else {
			if ( IERC20( payment_token ).transferFrom ( buyer , address(this) , price ) ){}
			else { revert("ERR() price not met-erc20") ;}
		}
		IERC1155( target_contract ).safeTransferFrom ( seller 
			, address( this )
			, tokenid
			, _saleinfo._amount
            , "0x00"
		);
		
		IERC1155( target_contract ).safeTransferFrom( address( this)
			, buyer
			, tokenid
			, _saleinfo._amount
    , "0x00"

		) ;
		if ( payment_token == address(0) ) {
			payable( seller ).call { value : price } ( "" );
		}
		else {
			IERC20( payment_token ).transfer( seller , price ) ;
		}
	} */
=======

>>>>>>> e3b25a1379ffc00240579323ae1e74fa7f02f027
}