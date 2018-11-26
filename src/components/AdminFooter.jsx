import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class AdminFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="#">Ricettario</a> &copy; 2019 all rights are reserved.</span>
        <span className="ml-auto">Powered by <a href="https://www.linkedin.com/in/mattiabuffetti/" target="_blank">Luigi Mattia Buffetti</a></span>
      </React.Fragment>
    );
  }
}

AdminFooter.propTypes = propTypes;
AdminFooter.defaultProps = defaultProps;

export default AdminFooter;