import InsurableTransactionFactory from '../../../../build/contracts/InsurableTransactionFactory.json'
import Transaction from '../../../../build/contracts/Transaction.json'

import store from '../../../store'
const contract = require('truffle-contract')
export const REFRESH_OFFERS = "REFRESH_OFFERS"

function offersRefreshed(offers) {
    return {
      type: REFRESH_OFFERS,
      payload: offers
    }
  }
  
  function fetchOfferDetails(offerAddresses) {
    let web3 = store.getState().web3.web3Instance
    let trxn = contract(Transaction)
    trxn.setProvider(web3.currentProvider)

    let getDetails = function getDetails(address) {
      return new Promise((resolve,reject)=>{
        trxn.at(address)
        // Get contract at the specific address and call it's details
          .then((instance)=> {
            instance.getTransactionDetails.call()
            .then(function(results) {
                // resolve promise successfully
                console.log(details)
                  var details = {
                    offerName: web3.toAscii(results[0]),
                    description: web3.toAscii(results[1]),
                    val: web3.fromWei(results[2],'ether').toString(),
                    maxCoverage:  web3.fromWei(results[4],'ether').toString(),
                    terms: web3.fromWei(results[5], 'ether').toString(),
                    counterParty: results[6],
                  }

                  resolve(details)
              })
              .catch(function(err) {
                // reject promise.. error
                reject(err)
            })
        })
      })
    }
    
    let actions = offerAddresses.map(getDetails)
    // Call all promises and then publish results. 
    let results = Promise.all(actions)
    return results;
  }
  export function refreshOffers() {
    let web3 = store.getState().web3.web3Instance
  
    // Double-check web3's status.
    if (typeof web3 !== 'undefined') {
      
      return function(dispatch) {
        const factory = contract(InsurableTransactionFactory)
        factory.setProvider(web3.currentProvider)
  
        factory.deployed().then(function(instance) {
          instance.getTransactions.call()
            .then(function(result) {
  
              console.log("Offers are refreshed!! , ",result)
              fetchOfferDetails(result).then(
                data=> {
                dispatch(offersRefreshed(data))
                })
  
            })
            .catch(function(err) {
              // If error, go to signup page.
              console.error('Error in getting factory ', err)
  
            })
        })
      }
    } else {
      console.error('Web3 is not initialized.');
    }
  }