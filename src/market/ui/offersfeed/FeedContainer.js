import React from 'react'

import OfferContainer from '../offeritem/OfferContainer'

// Utility function

const isOpenOffers = function(offers) {
  if (offers.length!==0) {
    // How many insured contracts are there
    // Iterate to check
      for (var offer in offers) {
        // If you find at least one uninsured contract, break and return true to render open offer.
        if (!offers[offer].isInsured) {
          return true;
        }
      }
      return false;
  } 
  return false;
}

/**
 * Grid container creates the list of offers - eventually to become a grid based 
 * component but for now lists in one row.
 */


const FeedContainer = ({ offers, onClick }) => (
  <section className="is-medium">
    <br/>

        { 
          isOpenOffers(offers) ?
            offers.map(offer=> {
              // if it's insured don't render to screen.
              if (offer.isInsured===true) {
                return null;
              } else {
                
                return (
                    <div className="no-params">
                      <OfferContainer 
                        {...offer}
                        onClick={(address,val) => onClick(address,val)} />
                      <br/>
                      </div>
                )
            }
           })
           :
            <div className="notification is-danger">
              <h3 className="title is-5"> No Open Offers. </h3>
              <p> There are currently no open offers available on the Marketplace. Please check back at another time. </p>
              <br/>
            </div>
        } 
    </section>
  )



export default FeedContainer;
