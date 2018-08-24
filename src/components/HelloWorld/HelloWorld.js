
import React, { Component } from 'react';
import './HelloWorld.less'
class HelloWorld extends Component{
    constructor(props) {
        super(props);

        this.state = {
            sum: 2
        }
    }

    add = () => {
        const {sum} = this.state;
        this.setState({sum: sum + 1})
    }

    render() {
        return (
            <div className="root" onClick={this.add}>
                sum : {this.state.sum}
            </div>
        )
    }
}

export default HelloWorld;