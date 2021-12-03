import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import validator from 'validator';

import {fetchContacts} from '../../Utils/API/contact.api.util';
import {Images} from '../../Assets';
import CardComponent from '../../Components/CardComponent';

const ContactComponent = props => {
  const [isLoading, setIsLoading] = React.useState(true);
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
      <Image
        style={{
          height: 20,
          width: 20,
          marginRight: 10,
          position: 'absolute',
          right: 20,
        }}
        source={Images.chevron_right}
      />
    </CardComponent>
  );

  const renderAddButton = () => (
    <View style={{position: 'absolute', bottom: 50, alignSelf: 'center'}}>
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
      setIsLoading(false);
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
        style={styles.contactList}
        data={props.contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {renderAddButton()}
      {isLoading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#00ff00"
        />
      )}
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
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactList: {
    backgroundColor: '#00a4de',
    paddingHorizontal: 20,
    height: '100%',
  },
});

export default ContactComponent;
