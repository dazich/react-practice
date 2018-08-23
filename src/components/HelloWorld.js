
import React, { Component } from 'react';
class HelloWorld extends Component{
    constructor(props) {
        super(props);

        this.state = {
            message: 'hello dada'
        }
    }

    render() {
        return (
            <div>
                {this.state.message}
            </div>
        )
    }
}

export default HelloWorld;