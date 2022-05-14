// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IFactoryERC721.sol";
import "./Lex.sol";


contract LexFactory is FactoryERC721, Ownable {
    using Strings for string;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    address private proxyRegistryAddress;
    address private nftAddress;

    string private factoryURL = "ipfs://QmeURrghiwGqWrZ5mLke85w2i3aHwsUu432NfTKpSBv3UM/factory.json";

    bool public onlyWhitelisted;
    address[] public whitelistedAddresses;

    uint256 LEX_SUPPLY = 250;
    uint256 NUM_OPTIONS = 1;

    constructor(address _proxyRegistryAddress, address _nftAddress) {
        proxyRegistryAddress = _proxyRegistryAddress;
        nftAddress = _nftAddress;

        onlyWhitelisted = true;

        fireTransferEvents(address(0), owner());
    }

    function name() override external pure returns (string memory) {
        return "Slotter House";
    }

    function symbol() override external pure returns (string memory) {
        return "CS";
    }

    function supportsFactoryInterface() override public pure returns (bool) {
        return true;
    }

    function numOptions() override public view returns (uint256) {
        return NUM_OPTIONS;
    }

    function transferOwnership(address newOwner) override public onlyOwner {
        address _prevOwner = owner();
        super.transferOwnership(newOwner);
        fireTransferEvents(_prevOwner, newOwner);
    }

    function fireTransferEvents(address _from, address _to) private {
        for (uint256 i = 0; i < NUM_OPTIONS; i++) {
            emit Transfer(_from, _to, i);
        }
    }

    function mint(uint256 _optionId, address _toAddress) override public {
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        assert(
            address(proxyRegistry.proxies(owner())) == _msgSender() ||
                owner() == _msgSender()
        );

        require(canMint(_optionId));

        if (onlyWhitelisted) {
            require(isWhitelisted(_toAddress), "user is not whitelisted");
        }

        mintAndTransfer(_toAddress);
    }

    function mintAndTransfer(address _toAddress) private {
        Lex openSeaLex = Lex(nftAddress);
        openSeaLex.mintTo(_toAddress);
    }

    function canMint(uint256 _optionId) override public view returns (bool) {
        Lex openSeaLex = Lex(nftAddress);
        return openSeaLex.totalSupply() < LEX_SUPPLY;
    }

    function tokenURI(uint256 _optionId) override external view returns (string memory) {
        return factoryURL;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use transferFrom so the frontend doesn't have to worry about different method names.
     */
    function transferFrom(
        address,
        address _to,
        uint256 _tokenId
    ) public {
        mint(_tokenId, _to);
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
        public
        view
        returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (
            owner() == _owner &&
            address(proxyRegistry.proxies(_owner)) == _operator
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256) public view returns (address _owner) {
        return owner();
    }

    /* whitelist functionality */
    function isWhitelisted(address _user) public view returns (bool) {
        for (uint i = 0; i < whitelistedAddresses.length; i++) {
            if (whitelistedAddresses[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function setOnlyWhitelisted(bool _state) public onlyOwner {
        onlyWhitelisted = _state;
    }
    
    function whitelistUsers(address[] calldata _users) public onlyOwner {
        delete whitelistedAddresses;
        whitelistedAddresses = _users;
    }
}
