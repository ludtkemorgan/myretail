import React, { Component } from 'react';
import ReactStars from 'react-stars';
import './styles/Reviews.css';

export class Reviews extends Component {
  render() {
    const { customerReview } = this.props;

    return (
      <div className="reviews-section">
        <div className="overall-rating">
          <div className="rating" >
            <ReactStars
              value={customerReview.consolidatedOverallRating}
              color2={'#cc0000'}
              edit={false}
              size="32"/>
            <div className="rating-qualifier">
              overall
            </div>
          </div>
          <a>view all {customerReview.totalReviews} reviews </a>
        </div>
        <table className="sample-rating">
          <col width="50%"/>
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
          <tr>
            <td>
              <ReviewSection review={customerReview.Pro[0]}/>
            </td>
            <td>
              <ReviewSection review={customerReview.Con[0]}/>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

class ReviewSection extends Component {
  render() {
    const { review } = this.props

    return (
      <div>
        <ReactStars
          value={review.overallRating}
          color2={'#cc0000'}
          color1={'#999999'}
          edit={false}/>
        <div className="rating-title bold">
          {review.title}
        </div>
        {review.review}
      </div>
    );
  }
}
