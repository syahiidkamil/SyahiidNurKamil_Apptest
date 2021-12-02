import React from 'react';
import {
  TextInput,
  View,
  FlatList,
  Text,
  Image,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';
import get from 'lodash/get';
import isUrl from 'validator/lib/isURL';

import {
  fetchContacts,
  postContact,
  editContact,
  deleteContact,
} from '../../Utils/API/contact.api.util';
import {Images} from '../../Assets';

const DetailComponent = props => {
  const params = get(props, 'route.params', {});
  const [firstName, onFirstNameChange] = React.useState('');
  const [lastName, onlastNameChange] = React.useState('');
  const [age, onChangeNumber] = React.useState(null);
  const [photo, onPhotoChange] = React.useState('');

  React.useEffect(() => {
    if (params.item) {
      onFirstNameChange(params.item.firstName);
      onlastNameChange(params.item.lastName);
      onChangeNumber(`${params.item.age}`);
      onPhotoChange(params.item.photo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route.params]);

  const onAgeChange = value => {
    if (typeof Number(value) === 'number' && Number(value) >= 0) {
      onChangeNumber(value);
    } else {
      alert('Age must be a number and greater equal than zero');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TextInput
        style={styles.input}
        onChangeText={onFirstNameChange}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onlastNameChange}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onAgeChange}
        value={age}
        placeholder="Age"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onPhotoChange}
        value={photo}
        placeholder="Photo URL"
      />
      <View style={{padding: 50}}>
        <Button
          color="#31814c"
          title={`Submit ${params.item ? 'Edit' : ''} Contact`}
          onPress={async () => {
            try {
              if (!isUrl(photo)) {
                alert('photo must be an url');
                return;
              }
              if (!firstName || !lastName || !age || !photo) {
                alert('All fields must be inputted');
                return;
              }
              const payload = {
                firstName,
                lastName,
                age,
                photo,
              };
              params.item
                ? await editContact(params.item.id, payload)
                : await postContact(payload);
              const fetchedContacts = await fetchContacts();
              props.actions.updateContacts(fetchedContacts);
              props.navigation.navigate('Contacts');
            } catch (error) {
              alert(
                'Something was wrong when submitting, please check the input',
              );
            }
          }}
        />
        {params.item && (
          <View style={{marginTop: 15}}>
            <Button
              color="#ea3d13"
              title={'Delete Contact'}
              onPress={async () => {
                try {
                  await deleteContact(params.item.id);
                  const fetchedContacts = await fetchContacts();
                  props.actions.updateContacts(fetchedContacts);
                  props.navigation.navigate('Contacts');
                } catch (error) {
                  alert('Contact DELETE Service is Broken/Down');
                }
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default DetailComponent;
