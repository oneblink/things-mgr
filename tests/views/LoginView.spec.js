import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { LoginView } from 'views/LoginView/LoginView';
import { mount } from 'enzyme';
import { Map } from 'immutable';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<LoginView {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<LoginView {...props} />);
}

describe('(View) Login', function () {
  let _rendered, _props, _spies;

  beforeEach(function () {
    _spies = {};
    _props = {
      login: Map({ username: '', password: '' }),
      ...bindActionCreators({
        loginSetUsername: (_spies.doubleAsync = sinon.spy()),
        loginSetPassword: (_spies.increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };

    shallowRenderWithProps(_props);
    _rendered = renderWithProps(_props);
  });

  it('Should render exactly two labels.', function () {
    const wrapper = mount(<LoginView {..._props} />);

    expect(wrapper).to.have.descendants('label');
  });

  it('Should render exactly two inputs.', function () {
    const wrapper = mount(<LoginView {..._props} />);

    expect(wrapper).to.have.descendants('input');
  });

  describe('Username input...', function () {
    let _input;

    beforeEach(() => {
      _input = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'input')[0];
    });

    it('should be rendered.', function () {
      expect(_input).to.exist;
    });

    it('should dispatch an action when changed.', function () {
      _spies.dispatch.should.have.not.been.called;
      TestUtils.Simulate.change(_input);
      _spies.dispatch.should.have.been.called;
    });
  });

  describe('Password input...', function () {
    let _input;

    beforeEach(() => {
      _input = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'input')[1];
    });

    it('should be rendered.', function () {
      expect(_input).to.exist;
    });

    it('should dispatch an action when changed.', function () {
      _spies.dispatch.should.have.not.been.called;
      TestUtils.Simulate.change(_input);
      _spies.dispatch.should.have.been.called;
    });
  });
});
