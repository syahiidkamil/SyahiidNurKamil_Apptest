import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {fetchContacts} from '../../Utils/API/contact.api.util';

const Contact = props => {
  const renderItem = ({item}) => (
    <View>
      <Text>
        {item.firstName} {item.lastName}
      </Text>
    </View>
  );

  const getAndSetContacts = async () => {
    const fetchedContacts = await fetchContacts();
    props.actions.updateContacts(fetchedContacts);
  };

  React.useEffect(() => {
    getAndSetContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View styles={styles.container}>
      <FlatList
        data={props.contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default Contact;
