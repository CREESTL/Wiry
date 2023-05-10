// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWiry.sol";

/// @title The WIRY token
contract Wiry is IWiry, ERC20, Pausable, Ownable {

    /// @notice The initial amount of tokens that should be minted
    uint256 public constant INITIAL_SUPPLY = 100_000;

    /// @notice List of users which are forbidden to receive or send tokens
    mapping(address => bool) public blackListed;

    constructor() ERC20("Wiry", "WIRY") {
        // Mint initial supply to the owner
        _mint(msg.sender, INITIAL_SUPPLY * 10 ** decimals());
    }

    /// @notice See {IWiry-pause}
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice See {IWiry-unpause}
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice See {IWiry-mint}
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

	/// @notice See {IWiry-burnFrom}
	function burnFrom(
		address from,
		uint256 amount
		) external onlyOwner {
		_burn(from, amount);
	}


    /// @notice See {IWiry-addToBlackList}
    function addToBlackList(address user) external onlyOwner {
        require(user != address(0), "Wiry: Zero address!");
        require(!blackListed[user], "Wiry: Already blacklisted!");
        blackListed[user] = true;
        emit AddedToBlackList(user);
    }

    /// @notice See {IWiry-removeFromBlackList}
    function removeFromBlackList(address user) external onlyOwner {
        require(user != address(0), "Wiry: Zero address!");
        require(blackListed[user], "Wiry: Not blacklisted!");
        blackListed[user] = false;
        emit RemovedFromBlackList(user);
    }

    /// @dev This hook is triggers before each token transfer. Allows
    ///      to run extra checks
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    )
        internal
        override
        // Check that contract is not paused
        whenNotPaused
    {
        // If either sender of receiver is blacklisted, cancel transfer
        require(!blackListed[from], "Wiry: Sender is blacklisted!");
        require(!blackListed[to], "Wiry: Receiver is blacklisted!");
        super._beforeTokenTransfer(from, to, amount);
    }
}
