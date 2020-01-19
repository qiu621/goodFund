import React from 'react';
import NavBar from '../Nav/Nav.js'



const divStyle = {
  height: '45vh',
  marginBottom: 'unset'
};

const coverContainer = {
  width: '42rem',
  marginRight: 'auto',
  marginLeft: 'auto'
};

function Header() {
    return (
    	<React.Fragment>
      		<NavBar />
      		<div class="jumbotron" style={divStyle}>
          <div class="cover-container" style={coverContainer}>
        			<h2 class="display-4">Crowdfunding for Good</h2>
        			<p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            </div>
      		</div>
    	</React.Fragment>
    );
}

export default Header;
