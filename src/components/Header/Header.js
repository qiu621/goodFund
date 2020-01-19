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
        			<h2 class="display-4">Crowdfunding for Good</h2>
        			<p class="lead">There should be a concise yet strong description of our product inserted here but nope it's not here so just start browsing projects!</p>
              <img src={video} alt="Card image cap" style={img}/>
            </div>
      		</div>
    	</React.Fragment>
    );
}

export default Header;
