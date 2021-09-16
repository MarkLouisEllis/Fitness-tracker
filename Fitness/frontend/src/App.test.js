import { render, screen } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';
import React from 'react';



//Snapshot test
//This test is used to establish if the app file with all its components renders correctly and that the UI does not change unexpectedly. 

describe('App', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//unit test
//I wanted to test the fetch request but I could not get a test to pass

test( 'app fetches' , () => {
expect(App( statusCode )).toBe( 200 );
});
;