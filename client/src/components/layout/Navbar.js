import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Navbar = ({ logo, title }) => {
    return (
        <Fragment>
            <nav className="navbar bg-primary">
                <h1><i className={logo} /> {title}</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
};

Navbar.defaultProps = {
    title: "Contact Manager",
    logo: "fas fa-id-card-alt"
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
};

export default Navbar;