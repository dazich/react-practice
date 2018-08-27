import React from 'react'

class Counter extends React.Component {
  state = { count: 0 }

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState(prevState => ({ count: prevState.count + 1 })),
      200,
    )
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        <p>titles阿斯达</p>
        <p>{this.state.count}</p>
      </div>
    )
  }
}

export default Counter
