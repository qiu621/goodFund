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
        uint256 deadline,
        uint256 goalAmount
    );

    function startProject(string calldata title, string calldata description, uint numberOfDays, uint goal) external {
        uint deadline = now + (numberOfDays * 1 days); // solium-disable-line
        Project newProject = new Project(msg.sender,  title, description, deadline, goal, nextProjectIndex);
        projects.push(newProject);
        nextProjectIndex = nextProjectIndex + 1;
        emit ProjectStarted(address(newProject), msg.sender, title, description, deadline, goal);
    }

    function returnAllProjects() external view returns(Project[] memory){
        return projects;
    }
}

contract Project {
    address payable public project_creator;
    string public project_title;
    string public project_description;
    uint256 public deadline;
    uint256 public goal;
    uint256 public project_ID;
    uint256 public status;
    mapping(address => uint256) public addressToPledgeAmount;
    event newPledge(address contributor, uint amount, uint total_raised);
    event CreatorPaid(address creator);
    event peopleRefunded(uint amonut_to_refund);

    constructor (address payable creator, string memory title, string memory description, uint256 _deadline, uint256 _goal, uint256 _ID) public {
        project_title = title;
        project_creator = creator;
        project_description = description;
        deadline = _deadline; // solium-disable-line
        goal = _goal;
        status = 0;
        project_ID = _ID;
    }

    function getTotalRaised() public view returns (uint256){
        return address(this).balance;
    }

    function updateStatus() public {
        if (now > deadline && getTotalRaised() > goal) { // solium-disable-line
            status = 2;
        } else if (now > deadline && getTotalRaised() < goal) { // solium-disable-line
            status = 1;
        }
    }

    function getStatus() public returns (uint256) {
        updateStatus();
        return status;
    }

    function pledge() public payable {
        require(now < deadline, "time is past pleding period"); // solium-disable-line
        addressToPledgeAmount[msg.sender] += msg.value;
        emit newPledge(msg.sender, msg.value, getTotalRaised());
    }

    function claimFunds() public {
        require(address(this).balance >= goal, "funding goal not met"); // solium-disable-line
        require(now >= deadline, "can only claim money after the pleding period"); // solium-disable-line
        require(msg.sender == project_creator, "only the project creator can claim funds");

        msg.sender.transfer(address(this).balance);
    }

    function refundAll() public {
        require(address(this).balance < goal, "funding goal not met");
        require(now >= deadline, "can only refund after the pleding period");  // solium-disable-line

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
        return deadline;
    }

    function getGoal() public view returns (uint256) {
        return goal;
    }

    function getID() public view returns (uint256) {
        return project_ID;
    }

    function getDetails() public returns
        (address payable project_creator, string memory project_title, string memory project_description, uint256 deadline, uint256 totalRaised, uint256 goal, uint256 status, uint256 project_ID) {
            project_creator = getCreator();
            project_title = getTitle();
            project_description = getDescription();
            deadline = getDeadline();
            totalRaised = getTotalRaised();
            goal = getGoal();
            status = getStatus();
            project_ID = getID();
        return (project_creator, project_title, project_description, deadline, totalRaised, goal, status, project_ID);
        }
    }