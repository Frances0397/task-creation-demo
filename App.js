import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FAB, Portal, Dialog, PaperProvider, TextInput, List } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { Input, Chip } from '@rneui/themed';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import CalendarPicker from 'react-native-calendar-picker';

export default function App() {

  const [visible, setVisible] = React.useState(false);
  const [taskDescription, setDescription] = React.useState("");
  const [expandedType, setExpandedType] = React.useState(false);
  const [expandedCust, setExpandedCust] = React.useState(false);
  const [tags, setTags] = React.useState([]);
  const [inputValue, setInputValue] = useState('');
  const [types, setTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [customer, setCustomer] = useState("");
  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    console.log("useEffect");
    fetchTypes();
    fetchCustomers();
    fetchStatuses();
  }, []);

  // const handlePressType = () => setExpandedType(!expandedType);
  // const handlePressCust = () => setExpandedCust(!expandedCust);


  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const openDialog = () => {
    console.log("New task dialog");
    showDialog();
  }

  //valori dummy - TOGLIERE
  const typeDummy = "EVO";
  const tagsDummy = [
    "ADOBE",
    "S4",
    "SMARTFORMS"
  ];
  const statusDummy = "INFO";

  const saveTask = () => {
    console.log("Saving task...");
    let newTask = {
      description: taskDescription,
      type_id: type,
      tags: tagsDummy,
      status: status,
      planned_release: end,//"2023-11-19T23:00:00.000Z",
      dev_start: start//"2023-11-08T23:00:00.000Z"
    };
    console.log(newTask);
    postTask(newTask);
  }

  const postTask = async (newTask) => {
    await axios.post("http://192.168.1.33:3000/task", newTask).then(
      function (res) {
        console.log(res);
        alert("Task aggiunto con successo"); //sostituire con qualcosa di più elegante
      }
    ).catch(function (error) {
      console.error(error);
    })
  }

  const handleAddTag = () => {
    if (inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  }

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const fetchTypes = async () => {
    await axios.get("http://192.168.1.33:3000/types").then(
      function (res) {
        console.log(res.data);
        setTypes(res.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchCustomers = async () => {
    await axios.get("http://192.168.1.33:3000/customers").then(
      function (res) {
        console.log(res.data);
        setCustomers(res.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const fetchStatuses = async () => {
    await axios.get("http://192.168.1.33:3000/statuses").then(
      function (res) {
        console.log(res.data);
        setStatuses(res.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const fetchTags = async () => {
    axios.get("http://192.168.1.33:3000/tags").then(
      function (res) {
        console.log(res.data);
        setTags(res.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const openStartSelector = () => setStartVisible(true);
  const openEndSelector = () => setEndVisible(true);

  const onStartChange = (startDate) => {
    setStartVisible(false);
    setStart(startDate);
  }

  const onEndChange = (endDate) => {
    setEndVisible(false);
    setEnd(endDate);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
      </Button> */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={openDialog}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Nuovo Task</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Descrizione*"
                value={taskDescription}
                onChangeText={taskDescription => setDescription(taskDescription)}
              />
              <SelectDropdown
                data={types}
                defaultButtonText="Tipologia"
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setType(selectedItem.ID);
                }}
                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.ID }}
                rowTextForSelection={(item, index) => { return item.text }}
              />
              <SelectDropdown
                data={customers}
                defaultButtonText="Cliente"
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setCustomer(selectedItem.nome);
                }}
                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.nome }}
                rowTextForSelection={(item, index) => { return item.nome }}
              />
              <SelectDropdown
                data={statuses}
                defaultButtonText="Stato"
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  setStatus(selectedItem.ID);
                }}
                buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.ID }}
                rowTextForSelection={(item, index) => { return item.description }}
              />
              <Button icon="calendar" mode="contained" onPress={openStartSelector}>
                Data inizio pianificato
              </Button>
              <Button icon="calendar" mode="contained" onPress={openEndSelector}>
                Data rilascio pianificato
              </Button>
              <Input
                placeholder="Add tags..."
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                onSubmitEditing={handleAddTag}
              />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    title={tag}
                    type="outline"
                    onPress={() => handleRemoveTag(tag)}
                  />
                ))}
              </View>
              {startVisible ? <CalendarPicker
                onDateChange={onStartChange}
              /> : <View />}
              {endVisible ? <CalendarPicker
                onDateChange={onEndChange}
              /> : <View />}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} >Close</Button>
              <Button onPress={saveTask}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
