
pragma solidity ^0.8.0;

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
abstract contract Context {
	function _msgSender() internal view virtual returns (address) {
			return msg.sender;
	}
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
contract PayForAssignedItem is Ownable {
//	address public _ow ner ;
	address public _feecollector ;
	uint256 _fraction_sellerprofit = 9700;
	uint256 _fraction_adminfee = 288;
	mapping ( address => bool ) _admins ;
	modifier onlyowner( address _address ) {
			require( _owner == _address , "Ownable: caller is not the owner");
			_;
	}
	modifier onlyowner_or_admin ( address _address ) {
		require ( _owner == _address || _admins[ _address ] , "ERR() not privileged");
		_;
	}
	function set_admin ( address _address , bool _status ) public onlyowner ( msg.sender ) {
		require ( _admins [ _address ] != _status , "ERR() redundant call" );
		_admins [ _address ] = _status ;
	}
	function set_fraction_sellerprofit ( uint256 _fraction )  public onlyowner ( msg.sender ){
		require ( _fraction_sellerprofit != _fraction , "ERR() redundant call" );
		_fraction_sellerprofit = _fraction ;
	}
	function set_fraction_adminfee ( uint256 _fraction ) public onlyowner ( msg.sender ){
		require ( _fraction_adminfee != _fraction , "ERR() redundant call" );
		_fraction_adminfee = _fraction ;
	}
	function set_feecollector ( address _address ) public onlyowner_or_admin ( msg.sender ){
		require ( _address != _feecollector , "ERR() redundant call");
		_feecollector = _address ;
	}

	constructor ( address __feecollector ) {
//		_owne r = msg.sender ;
		_feecollector = __feecollector ;
	}
	event Pay (
		address _pay_token 
		, uint256 _amountdue
		, address _seller
		, string  _itemid
		, address _referer
		, uint256 _referer_feerate
	);
	function pay ( address _pay_token 
		, uint256 _amountdue
		, address _seller
		, string memory _itemid
		, address _referer
		, uint256 _referer_feerate
	) public {
		if( IERC20( _pay_token).transferFrom ( msg.sender ,address(this) , _amountdue ) ){}
		else {revert("ERR() amount not met"); }
		uint256 remaining_amount = _amountdue ;
		if (_feecollector == address(0)){}
		else {
			IERC20 ( _pay_token).transfer ( _feecollector , _amountdue * _fraction_adminfee / 10000 ) ;
			remaining_amount -=_amountdue * _fraction_adminfee / 10000 ;
		}
		if ( _referer == address(0) ){} 
		else { IERC20 ( _pay_token ).transfer ( _referer , _amountdue * _referer_feerate / 10000 ) ;  
			remaining_amount -=  _amountdue * _referer_feerate / 10000  ;
		}
		IERC20 ( _pay_token).transfer ( _seller , remaining_amount ) ;
//			IERC20 ( _pay_token).transfer ( _seller , _amountdue * _fraction_sellerprofit / 10000 ) ;			
		emit Pay (
			_pay_token
			, _amountdue
			, _seller
			, _itemid
      , _referer
		, _referer_feerate

		) ;
	}
}