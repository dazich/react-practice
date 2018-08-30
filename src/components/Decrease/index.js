
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import './index.less'
import {add} from '../../actions'

class Index extends Component{
    static propTypes = {
        count: PropTypes.number.isRequired,
        add: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);

        console.log(this.props)
    }

    add = () => {
        const {count} = this.props;
        console.log('add')
        this.props.add(count+1)
    }

    render() {
        return (
            <div className="root" onClick={this.add}>
                desc-as- : {this.props.count}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    count: state.count
})

const mapDispatchToProps = dispatch => ({
    add: count => dispatch(add(count))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
// export default Index;