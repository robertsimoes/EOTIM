import React, { Component } from 'react'

class Debug extends Component {

  constructor(props) {
    
    super(props);
    console.log("props are ", props)
  
  }

  fund() {
    this.props.onFund();
      
  }
  
  refresh() {
    this.props.onRefresh();
    // todo this does not execute refresh on front end for state 
    // change props after state contract updated
  }

  ping() {
    console.log(this.props.contract)
  }

  render() {
    
    return(
      <div className="container">
      <br/><br/>
        <h1 className="title">Debug Land</h1>
        <section className="section">
            <h2> Transaction </h2>
            {/* <p> Balance: {this.state.contract.balance} </p> */}
            { this.props.contract==null? 
            <p>Loading..</p>
              : 
              <div>
              <p> Covarage {this.props.contract.coverage }</p>
              <p> Premium: {this.props.contract.premium}</p>
              <p> Insurer:  {this.props.contract.insurer}</p>
              </div>
            }
            
            {/* <p> Issuer:  {this.state..contract.owner}</p> */}
            <button className="button is-info" onClick={this.fund.bind(this)}>Fund 1 ETH</button>
            <button className="button is-success" onClick={this.refresh.bind(this)}>Refresh</button>
            <button className="button is-danger" onClick={this.ping.bind(this)}>ping</button>
        </section>
      </div>
    )
  }
}

export default Debug
