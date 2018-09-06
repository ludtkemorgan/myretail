import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import './styles/Carousel.css';

library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faSearchPlus);

export class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: props.images.PrimaryImage[0].image,
      firstVisible: 1,
      lastVisbile: props.numberShown,
      displayPrevious: "clickable",
      displayNext: "clickable",
      viewLargerModalOpen: false
    };
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.setNewImage = this.setNewImage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  previousImage(e) {
    if (this.state.firstVisible < 1) {
      return;
    }
    this.setState(prevState => ({
      firstVisible: prevState.firstVisible - 1,
      lastVisbile: prevState.lastVisbile - 1,
      displayPrevious: prevState.firstVisible === 1 ? "muted" : "clickable"
    }));
  }

  nextImage(e) {
    const numberOfImages = this.props.images.AlternateImages.length;
    if (this.state.lastVisbile >= numberOfImages) {
      return;
    }
    this.setState(prevState => ({
      firstVisible: prevState.firstVisible + 1,
      lastVisbile: prevState.lastVisbile + 1,
      displayNext: prevState.lastVisbile + 1 >= numberOfImages ? "muted" : "clickable"
    }));
  }

  setNewImage(src, e) {
    this.setState({
      selectedImage: src});
  }

  openModal() {
    this.setState({viewLargerModalOpen: true});
  }

  closeModal() {
    this.setState({viewLargerModalOpen: false});
  }

  render() {
    const { images, title, carouselId } = this.props;
    const primaryImage = this.state.selectedImage;
    const firstAlternative = this.state.firstVisible > 0 ? this.state.firstVisible - 1 : 0;
    const lastAlternative = this.state.lastVisbile > images.AlternateImages.length ?
                              images.AlternateImages.length : this.state.lastVisbile;

    return (
      <div id={carouselId} className="carousel">
        {primaryImage && <img className="carousel-image" src={primaryImage} alt={title}/> }
        <div className="view-larger clickable" onClick={this.openModal}>
          <FontAwesomeIcon icon="search-plus" /> view larger
        </div>
        <Modal
          isOpen={this.state.viewLargerModalOpen}
          contentLabel="View Larger"
          onRequestClose={this.closeModal}
        >
          <button onClick={this.closeModal}>Close Image</button>
          <img className="carousel-image large-image" src={primaryImage} alt={title}/>
        </Modal>
        <div className="carousel-additional">
          <a className={`change-image grid-column-fill ${this.state.displayPrevious}`} onClick={this.previousImage}>
             <FontAwesomeIcon icon="angle-left" />
          </a>
          {this.state.firstVisible === 0 &&
            <img id={`${carouselId}0`}
              className="carousel-additional-image clickable"
              src={images.PrimaryImage[0].image}
              alt={title}
              onClick={this.setNewImage}/>
          }
          {images.AlternateImages && images.AlternateImages.slice(firstAlternative, lastAlternative)
            .map(function(image, index) {
              const imageNumber = index + 1;
              const imageId = carouselId + imageNumber;
              const altText = "alternative image " + imageNumber;
              const classes = "carousel-additional-image grid-column-1-5 clickable";
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
            <a className={`change-image grid-column-fill ${this.state.displayNext}`} onClick={this.nextImage}>
              <FontAwesomeIcon icon="angle-right" />
            </a>
        </div>
      </div>
    );
  }
}
