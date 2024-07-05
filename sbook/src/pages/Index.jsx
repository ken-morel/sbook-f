import {Link} from 'react-router-dom';
import './index.sass';
//import './../response.js';

function Index() {
  let headerSize = -20;
  let headerOffset = $('#header')[0].offsetTop;
  window.onscroll = async function () {
      $('body')[0].style.backgroundPositionY = (-window.pageYOffset/10).toFixed(0).toString()+"px";
      console.log($('body')[0].style.backgroundPositionY);
      if (window.pageYOffset >= $scope.headerOffset) {
          $("#header").addClass("sticky");
      } else {
          $("#header").removeClass("sticky");
      }
      let elts = $("[onviewbg]")
      for(let i = elts.length - 1; i >= 0; i--) {
          let element = elts[i];
          if(window.pageYOffset >= element.offsetTop + 350) {
              element.parentElement.style.transition = "1s",
              element.parentElement.style.backgroundColor = element.getAttribute('onviewbg');
              break;
          }
      };
  }
  return (
    <>
      <div id="intro">
          <div round-right>
              <h1>
                  Sbook
              </h1>
          </div>
      </div>
      <div role="navigation" className="w3-bar" id="header">
        <Link to="/signin" className="w3-bar-item w3-button">signin</Link>
        <Link to="/signup" className="w3-bar-item w3-button">signup</Link>
      </div>
      <div id="first-part">
          <div view-className="w3-animate-opacity !w3-animate-fading" onviewbg="#1143" className="first-part-item" id="first-part-note">
              <h2>
                  Notes
              </h2>
              <p>
                  Note, an intuitive and interractive tool for building, reading and writting documentations.
              </p>
          </div>
          <div view-className="w3-animate-opacity !w3-animate-fading" onviewbg="#2513" className="first-part-item" id="first-part-chatty">
              <h2>
                  Chatty
              </h2>
              <p>
                  Bringing the several tools of Sbook and their tools into a chatting application.
              </p>
          </div>
          <div view-className="w3-animate-opacity !w3-animate-fading" onviewbg="#4353" className="first-part-item" id="first-part-question">
              <h2>
                  quizz
              </h2>
              <p>
                  Write, Edit, Create and respond to exams and tests to submit or get them marked by teachers
              </p>
          </div>
          <div view-className="w3-animate-opacity !w3-animate-fading" onviewbg="#5513" className="first-part-item" id="first-part-classNameroom">
              <h2>
                  Classroom
              </h2>
              <p>
                  Secure your classNamework, books, and exams into an isolated environment nobody can access.
              </p>
          </div>
      </div>
    </>
  );
}

export default Index;
