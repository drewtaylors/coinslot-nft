// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";


/**
 * @title Lex
 * Lex - a contract for my non-fungible lexs.
 */
contract Lex is ERC721Tradable {
    bool public revealed;
    address private factoryAddress;

    string private knownURL = "ipfs://QmerebchK4WNpeLCyqCZRwytUjiTogqaBamN8uzydf7s8j/";
    string private unknownURL = "ipfs://QmaP8pc5bMLyJ3EKLYhxsUWZWBw3h4mJA5XXFbHr3VATL5/";
    string private collectionURL = "ipfs://QmeURrghiwGqWrZ5mLke85w2i3aHwsUu432NfTKpSBv3UM/collection.json";
    string private fileExtension = ".json";

    constructor(address _proxyRegistryAddress)
        ERC721Tradable("NostaLex", "CS", _proxyRegistryAddress)
    {
        revealed = false;
    }

    function tokenURI(uint256 _tokenId) override public view returns (string memory) {
        string storage url;

        if (revealed != true) {
            url = unknownURL;
        } else {
            url = knownURL;
        }

        return string(abi.encodePacked(url, Strings.toString(_tokenId), fileExtension));
    }

    function contractURI() public view returns (string memory) {
        return collectionURL;
    }

    /* reveal functionality */
    function reveal() public onlyOwner {
        revealed = true;
    }

    function mintTo(address _to) override public {
        require(_msgSender() == factoryAddress || _msgSender() == owner(), "message sender is not owner or factory contract");
        mintToken(_to);
    }

    function linkFactory(address _factoryAddress) public onlyOwner {
        factoryAddress = _factoryAddress;
    }
}
