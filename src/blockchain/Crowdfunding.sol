pragma solidity 0.5.11;

contract Crowdfunding {

    // List of existing projects
    Project[] private projects;
    uint nextProjectIndex = 0;

    // Event that will be emitted whenever a new project is started
    event ProjectStarted(
        address contractAddress,
        address payable projectStarter,
        string projectTitle,
        string projectDesc,
        uint256 project_deadline,
        uint256 project_milestone_one_deadline,
        uint256 project_milestone_two_deadline,
        uint256 goalAmount,
        string project_creator_name
    );

    function startProject(string calldata title,
                          string calldata description,
                          uint numberOfDays,
                          uint project_goal,
                          string calldata name,
                          uint milestoneOneDays,
                          uint milestoneTwoDays)
                          external {
        uint project_deadline = now + (numberOfDays * 1 days); // solium-disable-line
        uint project_milestone_one_deadline = now + (numberOfDays * milestoneOneDays);
        uint project_milestone_two_deadline = now + (numberOfDays * milestoneTwoDays);
        Project newProject = new Project(msg.sender,
                                         title,
                                         description,
                                         project_deadline,
                                         project_goal,
                                         nextProjectIndex,
                                         name,
                                         project_milestone_one_deadline,
                                         project_milestone_two_deadline
                                         );
        projects.push(newProject);
        nextProjectIndex = nextProjectIndex + 1;
        emit ProjectStarted(address(newProject),
                            msg.sender,
                            title,
                            description,
                            project_deadline,
                            project_milestone_one_deadline,
                            project_milestone_two_deadline,
                            project_goal,
                            name);
    }

    function returnAllProjects() external view returns(Project[] memory){
        return projects;
    }
}

contract VoteBox {
    address[] private eligible_voters;
    address[] private already_voted;
    uint256 public closing_date;
    uint256 public yes_votes;
    uint256 public total_votes;

    constructor(address[] memory _eligible_voters, uint256 _closing_date) public {
        eligible_voters = _eligible_voters;
        closing_date = _closing_date;
        yes_votes = 0;
        total_votes = 0;
    }

    function contains(address[] memory voters, address a) public returns(bool) {
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i] == a) {
                return true;
            }
        }
        return false;
    }

    function vote(uint ballot) public { //0 = no, 1 = yes
        address potential_voter = msg.sender;
        require(contains(eligible_voters, potential_voter), 'not among list of pledgers');
        require(!contains(already_voted, potential_voter), 'you have already voted');
        if (ballot == 1) {
            yes_votes = yes_votes + 1;
        }
        total_votes = total_votes + 1;
        already_voted.push(potential_voter);
    }

    function getYes() public view returns (uint256) {
        return yes_votes;
    }

    function getTotal() public view returns (uint256) {
        return total_votes;
    }

    function returnResults() public view returns (uint256 yes_votes, uint256 total_votes) {
        require(now > closing_date, 'voting has not come to a close');
        return (getYes(), getTotal());
    }

    function pastVotingTime(uint end_voting_time) public returns (bool){
        return now > closing_date;
    }
}

contract Project {
    address payable public project_creator;
    string public project_title;
    string public project_description;
    uint256 public project_deadline;
    uint256 public project_goal;
    uint256 public project_ID;
    uint256 public project_status;
    string public project_creator_name;
    uint256 public project_milestone_one_deadline;
    uint256 public project_milestone_two_deadline;
    uint256 next_vote_date;
    mapping(address => uint256) public addressToPledgeAmount;
    address[] public eligible_voters;
    event newPledge(address contributor, uint amount, uint total_raised);
    event CreatorPaid(address creator);
    event peopleRefunded(uint amonut_to_refund);

    constructor (address payable creator,
                 string memory title,
                 string memory description,
                 uint256 _deadline,
                 uint256 _goal,
                 uint256 _ID,
                 string memory name,
                 uint256 milestone_one,
                 uint256 milestone_two)
                 public {
        project_title = title;
        project_creator = creator;
        project_description = description;
        project_goal = _goal;
        project_status = 0;
        project_ID = _ID;
        project_creator_name = name;

        project_milestone_one_deadline = milestone_one;
        project_milestone_two_deadline = milestone_two;
        project_deadline = _deadline; // solium-disable-line

        next_vote_date = project_milestone_one_deadline;
    }

    function getTotalRaised() public view returns (uint256){
        return address(this).balance;
    }

    function updateStatus() public {
        if (now > project_deadline && getTotalRaised() < project_goal) { // solium-disable-line
            project_status = 2;
        } else if (now > project_deadline && getTotalRaised() < project_goal) { // solium-disable-line
            project_status = 1;
        }
    }

    function updateVoteDate() public {
        if (now > next_vote_date) {
            if (next_vote_date == project_deadline) {
                return;
            } else if (next_vote_date == project_milestone_two_deadline) {
                next_vote_date = project_deadline;
            } else {
                next_vote_date = project_milestone_two_deadline;
            }

        }
    }

    function getIsVoting() public returns (bool) {
        uint256 current_next = next_vote_date;
        updateVoteDate();
        return current_next != next_vote_date;
    }

    function createVoteBox() public returns (VoteBox) {
        uint voting_deadline = (uint(next_vote_date) + now)/uint(2);
            return new VoteBox(eligible_voters, voting_deadline);
    }

    function getStatus() public returns (uint256) {
        updateStatus();
        return project_status;
    }

    function pledge() public payable {
        require(now < project_deadline, "time is past pleding period"); // solium-disable-line
        addressToPledgeAmount[msg.sender] += msg.value;
        eligible_voters.push(msg.sender);
        emit newPledge(msg.sender, msg.value, getTotalRaised());
    }

    function claimFunds() public {
        require(address(this).balance >= project_goal, "funding project_goal not met"); // solium-disable-line
        require(now >= project_deadline, "can only claim money after the pleding period"); // solium-disable-line
        require(msg.sender == project_creator, "only the project creator can claim funds");

        msg.sender.transfer(address(this).balance);
    }

    function refundAll() public {
        require(address(this).balance < project_goal, "funding project_goal not met");
        require(now >= project_deadline, "can only refund after the pleding period");  // solium-disable-line

        emit peopleRefunded(getTotalRaised());
        uint256 amount = addressToPledgeAmount[msg.sender];
        addressToPledgeAmount[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function getCreator() public view returns (address payable) {
        return project_creator;
    }

    function getTitle() public view returns (string memory) {
        return project_title;
    }

    function getDescription() public view returns (string memory) {
        return project_description;
    }

    function getDeadline() public view returns (uint256) {
        return project_deadline;
    }

    function getGoal() public view returns (uint256) {
        return project_goal;
    }

    function getID() public view returns (uint256) {
        return project_ID;
    }

    function getCreatorName() public view returns (string memory) {
        return project_creator_name;
    }

    function getMilestoneOne() public view returns (uint256) {
        return project_milestone_one_deadline;
    }

    function getMilestoneTwo() public view returns (uint256) {
        return project_milestone_two_deadline;
    }

    function getDetails() public returns
        (address payable project_creator,
         string memory project_title,
         string memory project_description,
         uint256 project_deadline,
         uint256 project_total_raised,
         uint256 project_goal,
         uint256 project_status,
         uint256 project_ID,
         string memory project_creator_name,
         uint256 project_milestone_one_deadline,
         uint256 project_milestone_two_deadline,
         bool project_is_voting) {
            project_creator = getCreator();
            project_title = getTitle();
            project_description = getDescription();
            project_deadline = getDeadline();
            project_total_raised = getTotalRaised();
            project_goal = getGoal();
            project_status = getStatus();
            project_ID = getID();
            project_creator_name = getCreatorName();
            project_milestone_one_deadline = getMilestoneOne();
            project_milestone_two_deadline = getMilestoneTwo();
            project_is_voting = getIsVoting();
        return (project_creator,
                project_title,
                project_description,
                project_deadline,
                project_total_raised,
                project_goal,
                project_status,
                project_ID,
                project_creator_name,
                project_milestone_one_deadline,
                project_milestone_two_deadline,
                project_is_voting);
        }
    }