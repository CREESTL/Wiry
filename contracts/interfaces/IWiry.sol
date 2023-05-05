// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title Interface of Wiry token
interface IWiry is IERC20{

	/// @notice Indicates that `user` was blacklisted
	event AddedToBlackList(address user);

	/// @notice Indicates that `user` was removed from blacklist
	event RemovedFromBlackList(address user);

	/// @notice Allows to pause all token's functions
	function pause() external;

	/// @notice Allows to unpause all token's functions
	function unpause() external;

	/// @notice Mints `amount` tokens to `to` 
	/// @param to The address to mint tokens to
	/// @param amount The amount of tokens to be minted
	function mint(address to, uint256 amount) external;

	/// @notice Burns `amount` of tokens from `from` address
	/// @param from The address holding tokens
	/// @param amount The amount of tokens to burn
	function burn(address from, uint256 amount) external;

	/// @notice Adds a new user to the blacklist
	/// @param user The user to be blacklisted
	function addToBlackList(address user) external;

	/// @notice Removes user from the blacklist
	/// @param user The user to be removed from blacklist
	function removeFromBlackList(address user) external;
}
