import React from 'react';
import {
  Text,
} from 'react-native';

import StyleSheet from '../../utils/xeStyleSheet';

import BaseComponent from '../../components/common/baseComponent';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class Foo extends BaseComponent {
  constructor(props) {
    super(props);
    this.displayName = 'Foo';
  }

  render() {
    return (
      <Text>Foo</Text>
    );
  }
}

Foo.propTypes = {
};

export default Foo;
