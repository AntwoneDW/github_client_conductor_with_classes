import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DataViewer extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

DataViewer.defaultProps = {
    name: 'Optimus_Prime'
};

DataViewer.propTypes = {
    name: PropTypes.string
};

export default DataViewer;