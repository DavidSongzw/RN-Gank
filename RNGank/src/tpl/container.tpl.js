import React from 'react';
import BaseComponent from '../../components/common/baseComponent';
import {
  View,
  Text,
} from 'react-native';

import StyleSheet from '../../utils/xeStyleSheet';

import { connect } from 'react-redux';

import { push, pop } from '../../actions/app';

import TimerMixin from 'react-timer-mixin';
import ReactMixin from 'react-mixin';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    ios: {
      top: 64,
    },
    android: {
      top: 44,
    },
  },
});

class Foo extends BaseComponent {
  constructor(props) {
    super(props);
    this.displayName = 'Foo';
    const {
      routeStack,
      scene,
    } = this.props;

    this.isActivePage = routeStack.last().get('key') === scene.route.key;

    this.componentDidApear = this.componentDidApear.bind(this);
    this.componentDisApear = this.componentDisApear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      routeStack,
      scene,
    } = nextProps;
    const isActivePage = routeStack.last().get('key') === scene.route.key;
    if (this.isActivePage && !isActivePage) { // 之前是活动页面，当前不是了
      this.componentDisApear();
    } else if (!this.isActivePage && isActivePage) { // 之前不是， 现在是
      this.componentDidApear();
    }

    this.isActivePage = isActivePage; // 重新赋值
  }

  componentDisApear() {
    console.log('componentDisApear', this.displayName);
  }

  componentDidApear() {
    console.log('componentDidApear', this.displayName);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Foo</Text>
      </View>
    );
  }
}

Foo.propTypes = {
  goPage: React.PropTypes.func.isRequired,
  goBack: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { app } = state;
  const currentTab = app.get('currentTab');
  const routes = app.get('routes');
  const routeStack = routes.get(currentTab);

  return {
    routes,
    routeStack,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goPage: (payload) => {
      dispatch(push(payload));
    },
    goBack: () => dispatch(pop()),
  };
}

ReactMixin(Foo.prototype, TimerMixin);

export default connect(mapStateToProps, mapDispatchToProps)(Foo);
