import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../../actions/auth";
import { FiTrello } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

export const Header = ({ user, startLogout }) => {
  return (
    <div className="header">
      <div className="header-items">
        <div className="menu-icon">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
          <div className="line line-3"></div>
        </div>

        <div className="header-items__title">
          <Link to="/home">
            <div className="header-items__title-icon">
              <FiTrello />
            </div>
          </Link>
          FLIP TRELLO
        </div>

        <button
          className="header-items__title-button show-for-desktop"
          onClick={startLogout}
        >
          <BiLogOut className="header-items__title-button-icon" />
          SIGN OUT
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
