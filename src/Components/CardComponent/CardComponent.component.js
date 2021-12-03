import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

const CardComponent = props => (
  <Pressable
    style={styles.card}
    onLongPress={() => {
      props.navigation.navigate('Detail', {item: props.item});
    }}
    delayLongPress={100}>
    {props.children}
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardComponent;
