import React, {Component} from 'react';

class DataViewer extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

export default DataViewer;