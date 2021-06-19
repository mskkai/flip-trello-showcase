import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../../actions/auth";
import { RiLoginCircleLine } from "react-icons/ri";

export const LoginPage = ({ startLogin }) => (
  <div className="box-container">
    <div className="box-container__item">
      <div className="box-container__header">Flip Trello</div>
      <div className="box-container__sub-header">A Task Management App</div>
      <button className="box-container__button" onClick={startLogin}>
        Login with Google
        <RiLoginCircleLine className="box-container__button-icon" />
      </button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
