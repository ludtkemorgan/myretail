import React, { Component } from 'react';
import './styles/Carousel.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faSearchPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faSearchPlus);

export class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: props.images.PrimaryImage[0].image,
      firstVisible: 1,
      lastVisbile: props.numberShown
    };
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.setNewImage = this.setNewImage.bind(this);
  }

  previousImage(e) {
    if (this.state.firstVisible < 1) {
      return;
    }
    this.setState(prevState => ({
      firstVisible: prevState.firstVisible - 1,
      lastVisbile: prevState.lastVisbile - 1
    }));
  }

  nextImage(e) {
    if (this.state.firstVisible >= this.props.images.AlternateImages.length) {
      return;
    }
    this.setState(prevState => ({
      firstVisible: prevState.firstVisible + 1,
      lastVisbile: prevState.lastVisbile + 1
    }));
  }

  setNewImage(src, e) {
    this.setState({
      selectedImage: src});
  }

  render() {
    const { images, title, carouselId } = this.props;
    const firstImageId = carouselId + "0";
    const primaryImage = this.state.selectedImage;
    const displayPrevious = this.state.firstVisible > 0 ? "" : "muted";
    const displayNext = this.state.lastVisbile < images.AlternateImages.length ? "" : "muted";
    const firstAlternative = this.state.firstVisible > 0 ? this.state.firstVisible - 1 : 0;
    const lastAlternative = this.state.lastVisbile > images.AlternateImages.length ?
                              images.AlternateImages.length : this.state.lastVisbile;

    return (
      <div id={carouselId} className="carousel">
        {primaryImage && <img className="carousel-image" src={primaryImage} alt={title}/> }
        <div className="view-larger">
          <FontAwesomeIcon icon="search-plus" /> view larger
        </div>
        <div className="carousel-additional">
          <a className={`change-image grid-column-fill ${displayPrevious}`} onClick={this.previousImage}>
             <FontAwesomeIcon icon="angle-left" />
          </a>
          {this.state.firstVisible === 0 &&
            <img id={firstImageId}
              data-index="0"
              className="carousel-additional-image"
              src={images.PrimaryImage[0].image}
              alt={title}
              onClick={this.setNewImage}/>
          }
          {images.AlternateImages && images.AlternateImages.slice(firstAlternative, lastAlternative)
            .map(function(image, index) {
              const imageNumber = index + 1;
              const imageId = carouselId + imageNumber;
              const altText = "alternative image " + imageNumber;
              const classes = "carousel-additional-image grid-column-1-5";
              return (
                <img key={imageId}
                  id={imageId}
                  data-index={imageNumber}
                  className={classes}
                  src={image.image}
                  alt={altText}
                  onClick={() => this.setNewImage(image.image)}/>
              );
          },this)}
            <a className={`change-image grid-column-fill ${displayNext}`} onClick={this.nextImage}>
              <FontAwesomeIcon icon="angle-right" />
            </a>
        </div>
      </div>
    );
  }
}
