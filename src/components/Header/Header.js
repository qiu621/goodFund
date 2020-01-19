import React from 'react';
import NavBar from '../Nav/Nav.js'
import video from './img/video.jpg'

const divStyle = {
  height: '57vh',
  marginBottom: 'unset'
};

const coverContainer = {
  width: '42rem',
  marginRight: 'auto',
  marginLeft: 'auto'
};

const img = {
  width: "80%",
  height: "80%",
  marginLeft: "auto",
  marginRight: "auto"
};

function Header() {
    return (
    	<React.Fragment>
      		<NavBar />
      		<div class="jumbotron" style={divStyle}>
          <div class="cover-container" style={coverContainer}>
        			<h2 class="display-6">
                The World's First Decentralized Crowdfunding Platform for Social Good
              </h2>
        			<p class="lead">Built on the Ethereum BlockChain, we protect backers and offer creators half the fees of traditional crowdfunding platforms.</p>

              <img src={video} alt="Card image cap" style={img}/>
            </div>
      		</div>
    	</React.Fragment>
    );
}

export default Header;
