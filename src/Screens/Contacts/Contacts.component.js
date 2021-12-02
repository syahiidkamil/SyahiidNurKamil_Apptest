import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Button,
  Pressable,
} from 'react-native';
import validator from 'validator';

import {fetchContacts} from '../../Utils/API/contact.api.util';
import {Images} from '../../Assets';

const CardComponent = props => (
  <Pressable
    style={{
      backgroundColor: 'white',
      borderRadius: 10,
      marginTop: 20,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
    }}
    onLongPress={() => {
      props.navigation.navigate('Detail', {item: props.item});
    }}
    delayLongPress={100}>
    {props.children}
  </Pressable>
);

const ContactComponent = props => {
  const ImageCircle = props => {
    const imageSource = validator.isURL(props.imageUrl)
      ? {
          uri: props.imageUrl,
        }
      : Images.no_profile;
    return (
      <Image
        style={{
          height: 50,
          width: 50,
          borderRadius: 10,
          marginRight: 10,
        }}
        source={imageSource}
      />
    );
  };

  const renderItem = ({item}) => (
    <CardComponent {...props} item={item}>
      <ImageCircle imageUrl={item.photo} />
      <View>
        <Text>
          {item.firstName} {item.lastName}
        </Text>
        {item.age && <Text>{item.age} years old</Text>}
      </View>
    </CardComponent>
  );

  const renderAddButton = () => (
    <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
      <Button
        color="#31814c"
        title="Add Contact +"
        onPress={() => {
          props.navigation.navigate('Detail');
        }}
      />
    </View>
  );

  const getAndStoreContacts = async () => {
    let contacts = [];
    try {
      const fetchedContacts = await fetchContacts();
      contacts = fetchedContacts;
    } catch (error) {
      // error
    } finally {
      props.actions.updateContacts(contacts);
    }
  };

  React.useEffect(() => {
    getAndStoreContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View styles={styles.container}>
      <FlatList
        style={{
          backgroundColor: '#00a4de',
          paddingHorizontal: 20,
          height: '100%',
        }}
        data={props.contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {renderAddButton()}
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

export default ContactComponent;
