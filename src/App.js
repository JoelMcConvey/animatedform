import './App.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowDown, faEnvelope, faKey, faCheck } from '@fortawesome/fontawesome-free-solid';


function App() {

  useEffect(() => {
    animatedForm();
  });

  const animatedForm = () => {
    const arrows = document.querySelectorAll('.icon-arrow');
    arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        const input = arrow.previousElementSibling;
        const parent = arrow.parentElement;
        const nextForm = parent.nextElementSibling;

        // Validation
        if (input.type === "text" && validateUser(input)) {
          nextSlide(parent, nextForm);
        } else if (input.type === "email" && validateEmail(input)) {
          nextSlide(parent, nextForm);
        } else if (input.type === "password" && validateUser(input)) {
          nextSlide(parent, nextForm);
        } else {
          parent.style.animation = "shake 0.5s ease";
        }
        parent.addEventListener("animationend", () => {
          parent.style.animation = "";
        });
      });
    });
  }

  const validateUser = (user) => {
    if (user.value.length < 5) {
      error("rgb(189,87,87)");
    } else {
      error("rgb(42, 156, 90)");
      return true;
    }
  };

  const validateEmail = (email) => {
    const validation = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (validation.test(email.value)) {
      error("rgb(42, 156, 90)");
      return true;
    } else {
      error("rgb(189,87,87)");
    }
  };

  const error = (colour) => {
    document.getElementById("body").style.backgroundColor = colour;
  };

  const nextSlide = (parent, nextForm) => {
    parent.classList.add('inactive');
    parent.classList.remove('active');
    nextForm.classList.add('active');
  };

  return (
    <div className="App" id="body">
      <form>
        <div className="field-name">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <input type="text" placeholder="Username" required />
          <FontAwesomeIcon icon={faArrowDown} className="icon-arrow" />
        </div>
        <div className="field-email inactive">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input type="email" placeholder="E-Mail" required />
          <FontAwesomeIcon icon={faArrowDown} className="icon-arrow" />
        </div>
        <div className="field-password inactive">
          <FontAwesomeIcon icon={faKey} className="icon" />
          <input type="password" placeholder="Password" required />
          <FontAwesomeIcon icon={faArrowDown} className="icon-arrow" />
        </div>
        <div className="field-finish inactive">
          <p>You're In!</p>
          <FontAwesomeIcon icon={faCheck} className="icon" />
        </div>
      </form>
    </div>
  );
}

export default App;
