
pragma solidity ^0.8.0;

interface IPayForAssignedItem  {
//	address public _ow ner ;
	function  _feecollector () external view returns ( address );
	 function _fraction_sellerprofit () external view returns ( uint256 );
	function _fraction_adminfee () external view returns ( uint256 );
	function _admins ( address ) external view returns (bool );

	function set_admin ( address _address , bool _status ) external ;
	function set_fraction_sellerprofit ( uint256 _fraction )  external ;
	function set_fraction_adminfee ( uint256 _fraction ) external ;
	function set_feecollector ( address _address ) external ;
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
	) external;
}