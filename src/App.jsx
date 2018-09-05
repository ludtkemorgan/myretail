import React, { Component } from 'react';
import { Button, ButtonStyle, ButtonSize, Carousel, Reviews } from './components/Components';
import './App.css';
import sampleData from './testData/item-data.json';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'

library.add(faTag);

class App extends Component {

  removeHtmlTags(feature, index) {
    const cleanedText = feature.replace(/<\/?[^>]+(>|$)/g, "");
    return (
      <li key={`feature-${index}`}> {cleanedText} </li>
    );
  }

  render() {
      const entry = sampleData.CatalogEntryView[0];
      const storePickup = entry.purchasingChannelCode === '0' || entry.purchasingChannelCode === '2'
      const onlineOrder = entry.purchasingChannelCode === '0' || entry.purchasingChannelCode === '1'
      return (

        <div className="App">
          <div className="my-retail-main grid">
            <div className="grid-column-1-2 grid-column-mobile-1-1">
              <header className="product-title">
                {entry.title}
              </header>
              <Carousel images={entry.Images[0]}
                title={entry.title}
                carouselId="product-image"
                numberShown={3}/>
              {/*Image*/}
              {/*Image carousel*/}
            </div>
            <div className="grid-column-1-2 grid-column-mobile-1-1">
              <div className="price-section y-gutter-all-twenty">
                <div className="price bold x-padding-right-ten">
                  {entry.Offers[0].OfferPrice[0].formattedPriceValue}
                </div>
                <span className="qualifier">
                  {entry.Offers[0].OfferPrice[0].priceQualifier}
                </span>
              </div>
              <div className="promotion-section y-padding-all-ten">
                {/*potentially add tooltip info*/}
                {entry.Promotions.map(function(promotion, index) {
                  return (
                    <div key={`promotion-${index}`} className="promotion red y-gutter-all-ten">
                      <span className="x-padding-right-ten">
                        <FontAwesomeIcon icon="tag" />
                      </span>
                      {promotion.Description[0].shortDescription}
                    </div>
                  );
                })}
              </div>
              {/*
              Quantities */}
              <div className="checkout-buttons y-gutter-all-twenty grid">
                {storePickup &&
                  <Button buttonId="pick-up"
                    text="PICK UP IN STORE"
                    classes="grid-column-1-2"
                    style={ButtonStyle.SECONDARY}
                    size={ButtonSize.LARGE}/>
                }
                {onlineOrder &&
                  <Button buttonId="cart"
                    text="ADD TO CART"
                    classes="grid-column-1-2"
                    style={ButtonStyle.PRIMARY}
                    size={ButtonSize.LARGE}/>
                }
              </div>
              <div className="return-policy">
                <div className="returns">returns</div>
                <div >{entry.ReturnPolicy[0].ReturnPolicyDetails[0].guestMessage}</div>
              </div>
              <div className="full-return-policy" dangerouslySetInnerHTML={{__html: entry.ReturnPolicy[0].legalCopy}} />
              <div className="additional-buttons y-gutter-all-twenty grid">
                <Button buttonId="registry" text="ADD TO REGISTRY" style={ButtonStyle.FLAT} classes="grid-column-1-3"/>
                <Button buttonId="list" text="ADD TO LIST" style={ButtonStyle.FLAT} classes="grid-column-1-3"/>
                <Button buttonId="share" text="SHARE" style={ButtonStyle.FLAT} classes="grid-column-1-3"/>
              </div>
              <div className="product-highlights y-gutter-all-twenty">
                <div className="product-highlights-title">
                  product highlights
                </div>
                <ul className="darkestGray">
                  {entry.ItemDescription[0].features.map(this.removeHtmlTags)}
                </ul>
              </div>

            </div>
            <div className="grid-column-1-2 grid-column-mobile-1-1">
              <Reviews customerReview={entry.CustomerReview[0]} />
            </div>
          </div>
        </div>
      );
    }
}

export default App;
