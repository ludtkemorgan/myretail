import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Button, ButtonStyle, Carousel, Reviews } from '../components/components';
import testData from '../testData/item-data.json';
import { mount, shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App catalog={testData}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('displays important information', () => {
  const wrapper = shallow(<App catalog={testData} />);
  expect(wrapper.find('.App')).toExist();
  expect(wrapper.find('.grid-column-1-2')).toHaveLength(3);
  expect(wrapper.find('.product-title')).toHaveText('Ninja\u2122 Professional Blender with Single Serve Blending Cups');
  expect(wrapper.find('.price')).toHaveText('$139.99');
  expect(wrapper.find('.qualifier')).toHaveText('Online Price');
  expect(wrapper.find('.clickable.red')).toHaveLength(2);
  expect(wrapper.find('.product-highlights li')).toHaveLength(10);
});

it('displays other components', () => {
  const wrapper = mount(<App catalog={testData} />);
  expect(wrapper).toContainReact(
    <Button buttonId="registry" text="ADD TO REGISTRY" style={ButtonStyle.FLAT} classes="grid-column-1-3"/>);
  expect(wrapper).toContainReact(
    <Button buttonId="list" text="ADD TO LIST" style={ButtonStyle.FLAT} classes="grid-column-1-3"/>);
  expect(wrapper).toContainReact(
    <Button buttonId="share" text="SHARE" style={ButtonStyle.FLAT} classes="grid-column-1-3"/>);
  expect(wrapper).toContainReact(
    <Button buttonId="pick-up" text="PICK UP IN STORE" classes="grid-column-1-2" style="secondary" size="large"/>);
  expect(wrapper).toContainReact(
    <Button buttonId="cart" text="ADD TO CART" classes="grid-column-1-2" style="primary" size="large"/>);
  expect(wrapper).toContainReact(
    <Reviews customerReview={testData.CatalogEntryView[0].CustomerReview[0]} />);
  expect(wrapper).toContainReact(
    <Carousel images={testData.CatalogEntryView[0].Images[0]}
      title="Ninja™ Professional Blender with Single Serve Blending Cups"
      carouselId="product-image"
      numberShown={3}/>);
});
