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

describe('Carousel component renders', () => {
  const wrapper = shallow(<Carousel images={mockImages}
    title="Blender"
    carouselId="test-carousel"
    numberShown={3} />);
  it('should render carousel component', () => {
    // should display 3 images in alternative images, one for main image and one for view larger
    expect(wrapper.find('img')).toHaveLength(5);
  });

  it('should use fontAwesomeIcon', () => {
    expect(wrapper).toContainReact(<FontAwesomeIcon icon="search-plus" />);
    expect(wrapper).toContainReact(<FontAwesomeIcon icon="angle-left" />);
    expect(wrapper).toContainReact(<FontAwesomeIcon icon="angle-right" />);
  });
});

describe('Carousel actions', () => {
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

  it('should shift alternative images when previous is clicked', () => {
    const wrapper = shallow(<Carousel images={mockImages}
      title="Blender"
      carouselId="test-carousel"
      numberShown={3} />);
    expect(wrapper).toHaveState({firstVisible: 1, lastVisible: 3, displayPrevious: "clickable"});
    const prevImg = wrapper.find('#previous-test-carousel');
    prevImg.simulate('click');
    expect(wrapper).toHaveState({firstVisible: 0, lastVisible: 2, displayPrevious: "muted"});
    // when clicked and already at zero, should not update
    prevImg.simulate('click');
    expect(wrapper).toHaveState({firstVisible: 0, lastVisible: 2});
  })

  it('should shift alternative images when next is clicked', () => {
    const wrapper = shallow(<Carousel images={mockImages}
      title="Blender"
      carouselId="test-carousel"
      numberShown={3} />);
    const nextImg = wrapper.find('#next-test-carousel');
    nextImg.simulate('click');
    expect(wrapper).toHaveState({firstVisible: 2, lastVisible: 4, displayNext: "clickable"});
    nextImg.simulate('click');
    // when clicked and already at end, should not update
    nextImg.simulate('click');
    expect(wrapper).toHaveState({firstVisible: 3, lastVisible: 5, displayNext: "muted"});
  })

});
