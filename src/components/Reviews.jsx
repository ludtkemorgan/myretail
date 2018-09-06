import React, { Component } from 'react';
import ReactStars from 'react-stars';
import Modal from 'react-modal';
import './styles/Reviews.css';

export class Reviews extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const { customerReview } = this.props;

    return (
      <div className="reviews-section">
        <div className="overall-rating">
          <div className="rating" >
            <ReactStars
              value={parseInt(customerReview.consolidatedOverallRating, 10)}
              color2={'#cc0000'}
              edit={false}
              size={32}/>
            <div className="rating-qualifier bold">
              overall
            </div>
          </div>
          <a className="bold view-all" onClick={this.openModal}>view all {customerReview.totalReviews} reviews</a>
          <Modal
            isOpen={this.state.modalIsOpen}
            contentLabel="reviews"
            onRequestClose={this.closeModal}
          >
            <button onClick={this.closeModal}>Close Reviews</button>
            {customerReview.Reviews && customerReview.Reviews.map((review, index) => <ReviewSection review={review} key={`customer-review-${index}`} />)}
          </Modal>
        </div>
        <table className="sample-rating">
          <thead>
            <tr>
              <th className="non-bold">
                <div className="type-20">
                  PRO
                </div>
                <div className="type-13">
                  most helpful 4-5 star review
                </div>
              </th>
              <th className="non-bold">
                <div className="type-20">
                  CON
                </div>
                <div className="type-13">
                  most helpful 1-2 star review
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ReviewSection review={customerReview.Pro[0]}/>
              </td>
              <td>
                <ReviewSection review={customerReview.Con[0]}/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class ReviewSection extends Component {
  render() {
    const { review } = this.props
    const date = Date.parse(review.datePosted);

    return (
      <div>
        <ReactStars
          value={parseInt(review.overallRating, 10)}
          color2={'#cc0000'}
          color1={'#999999'}
          edit={false}/>
        <div className="rating-title bold">
          {review.title}
        </div>
        {review.review}
        <div className="y-padding-top-twenty">
          {review.screenName} &nbsp;
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(date)}
        </div>
      </div>
    );
  }
}
