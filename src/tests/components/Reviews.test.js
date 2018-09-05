import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Reviews, ReviewSection } from '../../components/Components';
import ReactStars from 'react-stars';

const mockReviews =
  {
    "Con": [
     {
      "datePosted": "Mon Mar 11 13:13:55 UTC 2013",
      "overallRating": "1",
      "review": "Less than 2 months after purchase it completely stopped working. First it wouldn't detect the pitcher when trying to blend a significant amount, a couple weeks later it wouldn't detect the single serve cup. ",
      "reviewKey": "b326b0d6-e6ae-4ec5-8080-720f0ad741af",
      "screenName": "New York",
      "title": "Very unhappy"
     }
   ],
    "Pro": [
     {
      "datePosted": "Thu Apr 18 19:42:19 UTC 2013",
      "overallRating": "5",
      "review": "This blender works amazingly, and blends within seconds.  The single serve cups also work really well for smoothies or protein shakes!",
      "reviewKey": "d602bcdf-53be-4769-94da-3b3fd2517d21",
      "screenName": "Eric",
      "title": "Fantastic Blender"
     }
    ],
    "consolidatedOverallRating": "4",
    "totalPages": "2",
    "totalReviews": "14"
  }

describe('Reviews component', () => {
  it('should render reviews component', () => {
    const wrapper = shallow(<Reviews customerReview={mockReviews} />);
    expect(wrapper.find('table')).toExist();
    expect(wrapper.find('a')).toHaveText("view all 14 reviews");
  });

  it('should contain reactStars', () => {
    const wrapper = mount(<Reviews customerReview={mockReviews} />);
    expect(wrapper).toContainReact(<ReactStars
      value={4}
      color2={'#cc0000'}
      edit={false}
      size={32}/>);
    expect(wrapper).toContainReact(  <ReactStars
        value={1}
        color2={'#cc0000'}
        color1={'#999999'}
        edit={false}/>);
    expect(wrapper).toContainReact(  <ReactStars
        value={5}
        color2={'#cc0000'}
        color1={'#999999'}
        edit={false}/>);
  });
});
