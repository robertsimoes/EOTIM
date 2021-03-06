import React from 'react'


/**
 * The basis of the application is contained in an "OfferItem"
 * The offer item is passed it's relv. detail to display to to the user.
 */
const TransactionItem = ({ 
  offerName, 
  description, 
  val, 
  maxCoverage, 
  terms, 
  state,
  contractAddress,
  owner,
  onInsureClick}) => {
  let insuranceCost =  (val*maxCoverage/100).toFixed(12)

  return(
      <div className="card">
        <div className="card-content offer-item">
            <nav className="level">
              <div className="level-left">
                   <div className="level-item">
                      {state==="insured" ? 
                        <span className="tag is-success is-large"> Insured </span>  
                        :
                        state === "uninsured" ? 
                          <span className="tag is-danger is-large"> Uninsured </span>  
                          :
                          <span className="tag is-large"> Settled. </span>  
                      }
                    </div>
              </div>

                  <div className="level-right">
                      <div className="level-item">
                        <span className="tag is-success"> Transaction Value: {val} ETH </span>
                      </div>
                    
                      <div className="level-item">
                        <span className="tag is-warning"> Coverage: {maxCoverage}% </span>  
                      </div>
                    <div className="level-item">
                      <span className="tag">Premium: {parseInt(terms,2)}% </span>
                    </div>
                  
                    <div className="level-item">
                        <span className="tag is-info">
                          Payout: {(val*terms/100*maxCoverage/100)} ETH
                        </span>
                    </div>
                  </div>
              </nav>
            <h2 className="title is-4">{offerName} </h2>

            <div className="columns">
              <div className="column is-9">
                <p className="subtitle is-5">{description} </p>
                <label className="label">Contract Address</label>
                <a href={`https://ethplorer.io/address/${contractAddress}`}> {contractAddress}</a>
            </div>
          
            </div>
            <div className="card-footer">
            {
              state ==="insured" || state==="settled"? 
              null
                :
                <a href="#" className="card-footer-item" onClick={() => onInsureClick(contractAddress,insuranceCost)}>Insure for {insuranceCost} ETH</a>      
            }
                <a href="#" className="card-footer-item" onClick={(event) => alert("Owner address is " + owner + ".")}>Contact</a>
              </div>
      </div>  
    </div>
  )
}

export default TransactionItem
