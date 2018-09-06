import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { Carousel } from '../../components/Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const mockImages =
{
 "AlternateImages": [
    {
     "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt01"
    },
    {
     "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt02"
    },
    {
     "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt03"
    },
    {
     "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt04"
    },
    {
     "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt05"
    }
 ],
 "PrimaryImage": [
    {
     "image": "http:\/\/target.scene7.com\/is\/image\/Target\/14263758"
    }
  ],
  "imageCount": "8",
  "source": "internal"
}

describe('Carousel component', () => {
  it('should render carousel component', () => {
    const wrapper = shallow(<Carousel images={mockImages}
      title="Blender"
      carouselId="test-carousel"
      numberShown={3} />);
    expect(wrapper.find('img')).toHaveLength(5);
  });

  it('should use fontAwesomIcon', () => {
    const wrapper = mount(<Carousel images={mockImages}
      title="Blender"
      carouselId="test-carousel"
      numberShown={3} />);
    expect(wrapper).toContainReact(<FontAwesomeIcon icon="search-plus" />);
    expect(wrapper).toContainReact(<FontAwesomeIcon icon="angle-left" />);
    expect(wrapper).toContainReact(<FontAwesomeIcon icon="angle-right" />);
  });

  it('should update main image on click', () => {
    const wrapper = shallow(<Carousel images={mockImages}
      title="Blender"
      carouselId="test-carousel"
      numberShown={3} />);
    expect(wrapper).toHaveState('selectedImage', 'http:\/\/target.scene7.com\/is\/image\/Target\/14263758');
    const altImg = wrapper.find('#test-carousel1');
    altImg.simulate('click');
    expect(wrapper).toHaveState('selectedImage', 'http:\/\/target.scene7.com\/is\/image\/Target\/14263758_Alt01');
  })
});
