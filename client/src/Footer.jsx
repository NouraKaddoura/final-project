import React from 'react'
import NavBar from './NavBar.jsx'

var styles = {
	color: 'white',
	
}
var work ={
  color: 'white',
  textDecoration: 'none',
  backgroundColor: 'transparent'

}

// function toggle() {
// 	console.log('toggle')
//     var image = document.getElementById('coin1');
//     image.style.display = (image.style.display == 'none') ? 'block' : 'none';
// }

// setInterval(toggle, 5000);

const Footer = () => {
	return (
<div className='footer_contents'>
   <div  className="container">
  <div className="row">    
    <div className="col-xs-6 col-sm-6 col-md-3 column">          
      	<h3>Resources</h3>
        <ul>
          <li><a style={work} href="http://www.mentoring.org/our-work/events/">Mentoring.org</a></li>
          <li><a style={work} href="https://www.meetup.com/">MeetUp.com</a></li>
          <li><a style={work} href="https://www.thebalance.com/a-guide-to-understanding-the-role-of-a-mentor-2275318">The Role of a Mentor</a></li>
          <li><a style={work} href="https://cseg.ca/assets/files/students/Mentee-Roles-and-Responsibilities.pdf">The Role of a Mentee</a></li>
        </ul> 
      </div>
    <div class="col-xs-6 col-md-3 column">          
      	<h3>Follow Us</h3>
        <ul>
          <li><a style={work} href="https://github.com/NouraKaddoura">GitHub</a></li>
          <li><a style={work} href="https://generalassemb.ly/">General Assembly</a></li>
          <li><a style={work} href="https://www.instagram.com">Instagram</a></li>
          <li><a style={work} href="https://facebook.com">Facebook</a></li>
        </ul> 
      </div>
    <div class="col-xs-6 col-md-3 column">          
    <h3>About Us</h3>
        <ul>
          <li><a style={work} href="https://github.com/NouraKaddoura">Our Team</a></li>
          <li><a style={work} href="/users">Users</a></li>
          <li><a style={work} href="about-us.html">Privacy Policy</a></li>
          <li><a style={work} href="/users">Local Meetups</a></li>
        </ul> 
      </div>
    <div class="col-xs-6 col-md-3 column">     
    <h3>Contact Us</h3>
        <ul>
          <li><a style={work} href="about-us.html">Email</a></li>
          <li><a style={work} href="https://www.score.org/find-mentor">SCORE</a></li>
        </ul> 
        Made with ♡ by: Noura Kaddoura © 2018	          
      </div>
      
     
  </div>
</div>


            {/* <footer className="footer"></footer> */}
		</div>
	)
}

export default Footer







