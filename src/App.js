
import React, { Component } from 'react';
import HelloWorld from './components/HelloWorld/HelloWorld'
class App extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <HelloWorld data={321}/>
            </div>
        )
    }
}

export default App;