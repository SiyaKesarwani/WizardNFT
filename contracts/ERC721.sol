// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WizardNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    mapping(uint256=>string) private _token_URI;
    address public wizardToken;
    uint public price = 100*10**18;

    Counters.Counter private _tokenIdCounter;

    event WizardTokenUpdated(address);
    event PriceUpdated(uint);

    constructor() ERC721("Wizard NFT", "WNFT") {}

    function mint(address to) public {
        require(IERC20(wizardToken).allowance(msg.sender,address(this))>=price,"WizardNFT : Sufficient amount is not approved");
        IERC20(wizardToken).transferFrom(msg.sender,address(this),price);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function setURI(uint _tokenId, string memory _uri) public onlyOwner{
        _requireMinted(_tokenId);
        _token_URI[_tokenId] = _uri;
    }

    function tokenURI(uint _tokenId) public view override returns (string memory){
        _requireMinted(_tokenId);
        return _token_URI[_tokenId];
    }

    function setWizardToken(address _token) external onlyOwner{
        wizardToken = _token;
        emit WizardTokenUpdated(_token);
    }

    function updatePrice(uint _newPrice) external onlyOwner{
        price = _newPrice;
        emit PriceUpdated(_newPrice);
    }

    function withdrawFunds() external onlyOwner{
        IERC20(wizardToken).transfer(msg.sender,IERC20(wizardToken).balanceOf(address(this)));
    }
}