// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    enum CampaignStatus { Active, Successful, Failed }

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        CampaignStatus status;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.status = CampaignStatus.Active;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(campaign.status == CampaignStatus.Active, "Campaign is not active");
        require(block.timestamp < campaign.deadline, "Campaign has ended");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        campaign.amountCollected += msg.value;

        if (campaign.amountCollected >= campaign.target) {
            campaign.status = CampaignStatus.Successful;
            payable(campaign.owner).transfer(campaign.amountCollected);
        }
    }

    function checkCampaignStatus(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        if (campaign.status != CampaignStatus.Active) return;

        if (block.timestamp >= campaign.deadline) {
            if (campaign.amountCollected >= campaign.target) {
                campaign.status = CampaignStatus.Successful;
            } else {
                campaign.status = CampaignStatus.Failed;
            }
            // chuyển tiền dù chưa đủ
            if (campaign.amountCollected > 0) {
                payable(campaign.owner).transfer(campaign.amountCollected);
            }
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }
}
