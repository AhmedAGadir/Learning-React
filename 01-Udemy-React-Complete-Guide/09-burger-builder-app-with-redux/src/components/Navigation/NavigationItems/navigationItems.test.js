// jest is already built into react
// to download enzyme: npm install --save enzyme react-test-render enzyme-adapter-react-16
import React from 'react';
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'
// shallow allows us to render components without their children components, giving us placeholders for their children
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

//jest gives us access to describe
describe('NavigationItems', () => {
	// write the test in here
	it('should render two <NavigationItems /> elements if not authenticated', () => {
		// enzyme allows us to render react components stand-alone so that we can write unit tests
		const wrapper = shallow(<NavigationItems />);
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
});
// run npm test
