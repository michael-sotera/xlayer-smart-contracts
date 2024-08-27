// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Forwarder.sol";
import "@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol";

contract PlaygroundGameMatchXLayer is
    OwnableUpgradeable,
    ERC2771ContextUpgradeable,
    UUPSUpgradeable
{
    mapping(string => mapping(address => uint256)) public completedMatch; // completedMatch[gameId][msg.sender] = timestamp

    event MatchCompleted(address indexed _userAddress, string _gameId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor(
        ERC2771Forwarder forwarder
    ) ERC2771ContextUpgradeable(address(forwarder)) {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function completeMatch(string calldata _gameId) public {
        require(
            completedMatch[_gameId][_msgSender()] == 0,
            "PlayGround GameMatch: match already completed"
        );

        completedMatch[_gameId][_msgSender()] = block.timestamp;

        emit MatchCompleted(_msgSender(), _gameId);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function _msgSender()
        internal
        view
        override(ERC2771ContextUpgradeable, ContextUpgradeable)
        returns (address sender)
    {
        sender = ERC2771ContextUpgradeable._msgSender();
    }

    function _msgData()
        internal
        view
        virtual
        override(ERC2771ContextUpgradeable, ContextUpgradeable)
        returns (bytes calldata)
    {
        return ERC2771ContextUpgradeable._msgData();
    }

    function _contextSuffixLength()
        internal
        view
        virtual
        override(ERC2771ContextUpgradeable, ContextUpgradeable)
        returns (uint256)
    {
        return ERC2771ContextUpgradeable._contextSuffixLength();
    }
}
