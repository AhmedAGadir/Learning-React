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
	let wrapper;
	// beforeEach function will automatically be executed before each test
	beforeEach(() => {
		wrapper = shallow(<NavigationItems />)
	})
	// write the test in here
	it('should render two <NavigationItems /> elements if not authenticated', () => {
		// enzyme allows us to render react components stand-alone so that we can write unit tests
		expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});

	it('should render three <NavigationItems /> elements if authenticated', () => {
		// wrapper = shallow(<NavigationItems isAuthenticated/>)
		// or 
		wrapper.setProps({isAuthenticated: true})
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});

	it('should an exact logout button', () => {
		wrapper.setProps({isAuthenticated: true})
		expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
	});
});
// run npm test
