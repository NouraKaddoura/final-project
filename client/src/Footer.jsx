import React from 'react'
import NavBar from './NavBar.jsx'

var styles = {
	color: 'white',
	
	
}

function toggle() {
	console.log('toggle')
    // var image = document.getElementById('coin1');
    // image.style.display = (image.style.display == 'none') ? 'block' : 'none';
}

setInterval(toggle, 5000);

const Footer = () => {
	return (
<div onClick={toggle} className='footer_contents'>
   <div className="container">
  <div className="row">    
    <div className="col-xs-6 col-sm-6 col-md-3 column">          
      	<h3>Information</h3>
        <ul>
          <li><a href="about-us.html">About Us</a></li>
          <li><a href="about-us.html">Delivery Information</a></li>
          <li><a href="about-us.html">Privacy Policy</a></li>
          <li><a href="elements.html">Elements</a></li>
        </ul> 
      </div>
    <div class="col-xs-6 col-md-3 column">          
      	<h3>Follow Us</h3>
        <ul>
          <li><a href="about-us.html">About Us</a></li>
          <li><a href="about-us.html">Delivery Information</a></li>
          <li><a href="about-us.html">Privacy Policy</a></li>
          <li><a href="elements.html">Elements</a></li>
        </ul> 
      </div>
    <div class="col-xs-6 col-md-3 column">          
      	<h3>Contact Us</h3>
        <ul>
          <li><a href="about-us.html">About Us</a></li>
          <li><a href="about-us.html">Delivery Information</a></li>
          <li><a href="about-us.html">Privacy Policy</a></li>
          <li><a href="elements.html">Elements</a></li>
        </ul> 
      </div>
    <div class="col-xs-6 col-md-3 column">          
      	<h3>Customer Service</h3>
        <ul>
          <li><a href="about-us.html">About Us</a></li>
          <li><a href="about-us.html">Delivery Information</a></li>
          <li><a href="about-us.html">Privacy Policy</a></li>
          <li><a href="elements.html">Elements</a></li>
        </ul> 
      </div>
      
    
  </div>
</div>
			
            {/* <footer className="footer"></footer> */}
		</div>
	)
}

export default Footer







