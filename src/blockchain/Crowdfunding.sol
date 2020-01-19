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
        uint256 project_m1,
        string project_m1Task,
        uint256 project_m2,
        string project_m2Task,
        uint256 goalAmount,
        string project_creator_name
    );

    function startProject(string calldata title,
                          string calldata description,
                          uint daysTillDdl,
                          uint project_goal,
                          string calldata name,
                          uint m1,
                          string calldata project_m1Task,
                          uint m2,
                          string calldata project_m2Task)
                          external {
        uint project_deadline = now + (daysTillDdl * 1 days); // solium-disable-line
        uint project_m1 = now + (m1 * 1 days);
        uint project_m2 = now + (m2 * 1 days);
        Project newProject = new Project(msg.sender,
                                         title,
                                         description,
                                         project_deadline,
                                         project_goal,
                                         nextProjectIndex,
                                         name,
                                         project_m1,
                                         project_m1Task,
                                         project_m2,
                                         project_m2Task
                                         );
        projects.push(newProject);
        nextProjectIndex = nextProjectIndex + 1;
        emit ProjectStarted(address(newProject),
                            msg.sender,
                            title,
                            description,
                            project_deadline,
                            project_m1,
                            project_m1Task,
                            project_m2,
                            project_m2Task,
                            project_goal,
                            name);
    }

    function returnAllProjects() external view returns(Project[] memory){
        return projects;
    }
}

// contract VoteBox {
//     address[] private eligible_voters;
//     address[] private already_voted;
//     uint256 public closing_date;
//     uint256 public yes_votes;
//     uint256 public total_votes;
//     bool public doneVoting;

//     constructor(address[] memory _eligible_voters, uint256 _closing_date) public {
//         eligible_voters = _eligible_voters;
//         doneVoting = false;
//         closing_date = _closing_date;
//         yes_votes = 0;
//         total_votes = 0;
//     }

//     function contains(address[] memory voters, address a) public returns(bool) {
//         for (uint i = 0; i < voters.length; i++) {
//             if (voters[i] == a) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     function vote(uint ballot) public { //0 = no, 1 = yes
//         address potential_voter = msg.sender;
//         require(contains(eligible_voters, potential_voter), 'not among list of pledgers');
//         require(!contains(already_voted, potential_voter), 'you have already voted');
//         if (ballot == 1) {
//             yes_votes = yes_votes + 1;
//         }
//         total_votes = total_votes + 1;
//         already_voted.push(potential_voter);
//         if (pastVotingTime()) {
//             doneVoting = true;
//         }
//     }

//     function getYes() public view returns (uint256) {
//         return yes_votes;
//     }

//     function getTotal() public view returns (uint256) {
//         return total_votes;
//     }

//     function returnResults() public view returns (uint256 yes_votes, uint256 total_votes) {
//         require(now > closing_date, 'voting has not come to a close');
//         return (getYes(), getTotal());
//     }

//     function pastVotingTime() public returns (bool){
//         return now > closing_date;
//     }
// }

contract Project {
    address payable public project_creator;
    string public project_title;
    string public project_description;
    uint256 public project_deadline;
    uint256 public project_goal;
    uint256 public project_ID;
    uint256 public project_status;
    string public project_creator_name;
    uint256 public project_m1;
    string public project_m1Task;
    uint256 public project_m2;
    string public project_m2Task;
    uint256 public yesVotes;
    uint256 public noVotes;
    // VoteBox private currentVoteBox;
    // uint256 next_vote_date;
    mapping(address => uint256) public addressToPledgeAmount;
    address[] public finishedVoting;
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
                 uint256 m1,
                 string memory m1Task,
                 uint256 m2,
                 string memory m2Task)
                 public {
        project_title = title;
        project_creator = creator;
        project_description = description;
        project_goal = _goal;
        project_status = 0;
        project_ID = _ID;
        project_creator_name = name;
        project_m1 = m1;
        project_m1Task = m1Task;
        project_m2 = m2;
        project_m2Task = m2Task;
        yesVotes = 0;
        noVotes = 0;
        project_deadline = _deadline; // solium-disable-line

        // next_vote_date = project_milestone_one_deadline;
    }

    function getTotalRaised() public view returns (uint256){
        return address(this).balance;
    }

    function updateStatus() public {
        if (project_status == 0) {
            if (now > project_m1 && now < project_m1 + (7*1 days)) {
                if (getTotalRaised() < getGoal()) {
                    project_status = 5;
                } else {
                    project_status = 1;
                }
            }
        } else if (project_status == 1) {
            if (now > project_m1 + (7*1 days) && now < project_m2) {
                if (yesVotes > noVotes) {
                    project_status = 2;
                    yesVotes = 0;
                    noVotes = 0;
                } else {
                    project_status = 5;
                }
            }
        } else if (project_status == 2) {
            if (now > project_m2 && now < project_m2 + (7*1 days)) {
                project_status = 3;
            }
        } else if (project_status == 3) {
            if (now > project_m2 + (7*1 days)) {
                if (yesVotes > noVotes) {
                    project_status = 4;
                } else {
                    project_status = 5;
                }
            }
        }
    }

    function getStatus() public returns (uint256) {
        updateStatus();
        return project_status;
    }

    function contains(address[] memory voters, address a) public returns(bool) {
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i] == a) {
                return true;
            }
        }
        return false;
    }

    function vote(uint ballot) public {
        address voter = msg.sender;
        require(project_status == 1 || project_status == 3, 'voting not open');
        require(addressToPledgeAmount[voter] > 0, 'not among list of pledgers');
        require(!contains(finishedVoting, voter), 'you have already voted');

        if (ballot == 1) {
            yesVotes = yesVotes + 1;
        } else {
            noVotes = noVotes + 1;
        }
        finishedVoting.push(voter);
        updateStatus();
    }

    function pledge() public payable {
        require(now < project_deadline, "time is past pleding period"); // solium-disable-line
        addressToPledgeAmount[msg.sender] += msg.value;
        // eligible_voters.push(msg.sender);
        emit newPledge(msg.sender, msg.value, getTotalRaised());
        updateStatus();
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

    function getM1() public view returns (uint256) {
        return project_m1;
    }

    function getM1Task() public view returns (string memory) {
        return project_m1Task;
    }

    function getM2() public view returns (uint256) {
        return project_m2;
    }

    function getM2Task() public view returns (string memory) {
        return project_m2Task;
    }

    function getYesVotes() public view returns (uint256) {
        return yesVotes;
    }

    function getNoVotes() public view returns (uint256) {
        return noVotes;
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
         uint256 project_m1,
         string memory project_m1Task,
         uint256 project_m2,
         string memory project_m2Task,
         uint256 project_yesVotes,
         uint256 project_noVotes) {
            project_creator = getCreator();
            project_title = getTitle();
            project_description = getDescription();
            project_deadline = getDeadline();
            project_total_raised = getTotalRaised();
            project_goal = getGoal();
            project_status = getStatus();
            project_ID = getID();
            project_creator_name = getCreatorName();
            project_m1 = getM1();
            project_m1Task = getM1Task();
            project_m2 = getM2();
            project_m2Task = getM2Task();
            project_yesVotes = getYesVotes();
            project_noVotes = getNoVotes();
        return (project_creator,
                project_title,
                project_description,
                project_deadline,
                project_total_raised,
                project_goal,
                project_status,
                project_ID,
                project_creator_name,
                project_m1,
                project_m1Task,
                project_m2,
                project_m2Task,
                project_yesVotes,
                project_noVotes);
        }
    }