<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> sam
>>>>>>> d56ce6068a24ab40c1da582745d64b0ceadad154
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
    event Transfer ( address indexed from, address indexed to, uint256 value);
    event Approval( address indexed owner, address indexed spender, uint256 value);
}
contract PayForAssignedItem {
	address public _owner ;
	address public _feecollector ;
	uint256 _fraction_sellerprofit = 9700;
	uint256 _fraction_adminfee = 300 ;
  modifier onlyowner( address _address ) {
		require( _owner == _address , "Ownable: caller is not the owner");
		_;
  }
	function set_feecollector ( address _address ) public onlyowner ( msg.sender ){
		require ( _address != _feecollector , "ERR() redundant call");
		_feecollector = _address ;
	}
	constructor ( address __feecollector ) {
		_owner = msg.sender ;
		_feecollector = __feecollector ;

	}
	event Pay (
		address _pay_token 
		, uint256 _amountdue
		, address _seller
		, string  _itemid
	);
	function pay ( address _pay_token 
		, uint256 _amountdue
		, address _seller
		, string memory _itemid
	) public {
		if( IERC20( _pay_token).transferFrom ( msg.sender ,address(this) , _amountdue ) ){}
		else {revert("ERR() amount not met"); }
		if (_feecollector == address(0)){}
		else {			
			IERC20 ( _pay_token).transfer ( _feecollector , _amountdue * _fraction_adminfee / 10000 ) ;
			IERC20 ( _pay_token).transfer ( _seller , _amountdue * _fraction_sellerprofit / 10000 ) ;
		}
		emit Pay (
			_pay_token
			, _amountdue
			, _seller
			, _itemid
		) ;
	}
}