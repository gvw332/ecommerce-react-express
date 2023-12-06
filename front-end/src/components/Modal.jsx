import React, { useState } from "react";
import "../css/Modal.css";

export default function Modal() {
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    const toggleModal1 = () => {
      setModal1(!modal1);
    };
    const toggleModal2 = () => {
        setModal2(!modal2);
      };
  
    if(modal1 || modal2) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  
    return (
      <>
        <button onClick={toggleModal1} className="btn-condition-modal">
          Conditions d'utilisation
        </button>
  
        {modal1 && (
          <div className="modal">
            <div onClick={toggleModal1} className="overlay"></div>
            <div className="modal-content">
            <button className="close-top-modal" onClick={toggleModal1}>
                CLOSE
              </button>
              <h2>Conditions d'utilisation</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                perferendis suscipit officia recusandae, eveniet quaerat assumenda
                id fugit, dignissimos maxime non natus placeat illo iusto!
                Sapiente dolorum id maiores dolores? Illum pariatur possimus
                quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                placeat tempora vitae enim incidunt porro fuga ea.
              </p><br></br><br></br>
              <button className="close-bottom-modal" onClick={toggleModal1}>
                FERMER
              </button>
            </div>
          </div>
        )}

<button onClick={toggleModal2} className="btn-condition-modal">
          Mentions légales
        </button>
  
        {modal2 && (
          <div className="modal">
            <div onClick={toggleModal2} className="overlay"></div>
            <div className="modal-content">
            <button className="close-top-modal" onClick={toggleModal2}>
                CLOSE
              </button>
              <h2>Mentions légales</h2>
              <p>
                testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest.
              </p><br></br><br></br>
              <button className="close-bottom-modal" onClick={toggleModal2}>
                FERMER
              </button>
            </div>
          </div>
        )}

      </>
    );
  }