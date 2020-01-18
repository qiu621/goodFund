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
    enum Status {Unsuccessful, Successful, Ongoing}

    address payable public project_creator;
    string public project_title;
    string public project_description;
    uint256 public deadline;
    uint256 public goal;
    uint256 public project_ID;
    Status public status;
    mapping(address => uint256) public addressToPledgeAmount;
    event newPledge(address contributor, uint amount, uint amount_raised);
    event CreatorPaid(address creator);
    event peopleRefunded(uint amonut_to_refund);

    constructor (address payable creator, string memory title, string memory description, uint256 _deadline, uint256 _goal, uint256 _ID) public {
        project_title = title;
        project_creator = creator;
        project_description = description;
        deadline = _deadline; // solium-disable-line
        goal = _goal;
        status = Status.Ongoing;
        project_ID = _ID;
    }

    function getTotalRaised() public view returns (uint256){
        return address(this).balance;
    }

    function updateStatus() public {
        if (now > deadline && getTotalRaised() > goal) { // solium-disable-line
            status = Status.Successful;
        } else if (now > deadline && getTotalRaised() < goal) { // solium-disable-line
            status = Status.Unsuccessful;
        }
    }

    function getStatus() public returns (Status) {
        updateStatus();
        return status;
    }

    function pledge(uint256 amount) public payable {
        require(now < deadline, "time is past pleding period"); // solium-disable-line
        require(msg.value == amount, "amount sent is not amount promised");
        require(amount > 0, "cannot contribute negative amount");

        addressToPledgeAmount[msg.sender] += amount;
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

    function getDetails() public returns
        (address payable _project_creator, string memory _project_title, string memory _project_description, uint256 _deadline, uint256 total_raised,
         uint256 _goal, Status _status, uint256 _ID) {
        _project_creator = project_creator;
        _project_title = project_title;
        _project_description = project_description;
        _deadline = deadline;
        total_raised = getTotalRaised();
        _goal = goal;
        _status = getStatus();
        _ID = project_ID;
        }
    }