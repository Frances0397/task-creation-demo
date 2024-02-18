import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, FAB, Portal, Dialog, PaperProvider, TextInput, List, Chip, Provider, Divider, IconButton, Checkbox, Modal } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { Input } from '@rneui/themed';
import axios from 'axios';
import { DatePickerInput } from 'react-native-paper-dates';

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
  const [request, setRequest] = useState(new Date());
  const [documentCollapsed, setDocumentCollapsed] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    fetchTypes();
    fetchCustomers();
    fetchStatuses();
  }, []);

  // const handlePressType = () => setExpandedType(!expandedType);
  // const handlePressCust = () => setExpandedCust(!expandedCust);

  console.log("document");
  console.log(documentCollapsed);
  console.log(documentVisible);

  const openDocumentInput = () => {
    setDocumentCollapsed(!documentCollapsed);
    setDocumentVisible(!documentVisible);
  }

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
    <Provider>
      <View style={styles.container}>
        {/* <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')}>
      </Button> */}
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={openDialog}
        />
        <Portal >
          <Dialog visible={visible} onDismiss={hideDialog} style={{ width: '80%', alignSelf: 'center', maxHeight: 550, minHeight: 300 }}>
            <Dialog.Title style={styles.titleText}>Nuovo Task</Dialog.Title>
            <Dialog.Content style={{ alignSelf: 'center', maxHeight: 400, minHeight: 300 }}>
              <TextInput
                label="Descrizione*"
                value={taskDescription}
                onChangeText={taskDescription => setDescription(taskDescription)}
                style={{ marginVertical: 10 }}
              />
              <Dialog.ScrollArea style={{ maxHeight: 550 }}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 15, maxHeight: 550 }}>
                  <View style={styles.horizontalContainer}>
                    <View style={styles.accordionSelectorContainer}>
                      <List.Accordion
                        title="Uncontrolled Accordion"
                        style={styles.accordionSelector}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                      </List.Accordion>
                    </View>
                    <View style={styles.accordionSelectorContainer}>
                      <List.Accordion
                        title="Uncontrolled Accordion"
                        style={styles.accordionSelector}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                      </List.Accordion>
                    </View>
                    <View style={styles.accordionSelectorContainer}>
                      <List.Accordion
                        title="Uncontrolled Accordion"
                        style={styles.accordionSelector}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                      </List.Accordion>
                    </View>
                  </View>
                  <View style={styles.horizontalContainer}>
                    <Text style={styles.selectorLabel}>Resp. Funzionale:</Text>
                    <View style={styles.accordionSelectorContainer}>
                      <List.Accordion
                        title="(selezionare)"
                        style={styles.accordionSelector}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                      </List.Accordion>
                    </View>
                    <Text style={styles.selectorLabel}>Resp. Funzionale:</Text>
                    <View style={styles.accordionSelectorContainer}>
                      <List.Accordion
                        title="(selezionare)"
                        style={styles.accordionSelector}>
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                      </List.Accordion>
                    </View>
                  </View>
                  <View style={styles.horizontalContainer}>
                    <View style={{ marginRight: 15, marginBottom: 10 }}>
                      <DatePickerInput
                        locale="it"
                        label="Data richiesta"
                        value={request}
                        onChange={(request) => setRequest(request)}
                        inputMode="start"

                      />
                    </View>
                    <View style={{ marginRight: 15, marginBottom: 10 }}>
                      <DatePickerInput
                        locale="it"
                        label="Data inizio pianificato"
                        value={start}
                        onChange={(start) => setStart(start)}
                        inputMode="start"
                      />
                    </View>
                    <View style={{ marginRight: 15, marginBottom: 10 }}>
                      <DatePickerInput
                        locale="it"
                        label="Data rilascio pianificato"
                        value={end}
                        onChange={(end) => setEnd(end)}
                        inputMode="start"
                      />
                    </View>
                    {/* <Button icon="calendar" mode="contained" onPress={openStartSelector} style={{ marginRight: 20 }}>
                      Data richiesta
                    </Button>
                    <Button icon="calendar" mode="contained" onPress={openStartSelector} style={{ marginRight: 20 }}>
                      Data inizio pianificato
                    </Button>
                    <Button icon="calendar" mode="contained" onPress={openEndSelector}>
                      Data rilascio pianificato
                    </Button> */}
                  </View>
                  {/* {startVisible ? <View style={{ backgroundColor: '#fff', maxWidth: 200 }}><CalendarPicker
                    style={{ maxWidth: 150 }}
                    onDateChange={onStartChange}
                  /></View> : <View />} */}

                  {endVisible ? <CalendarPicker
                    onDateChange={onEndChange}
                  /> : <View />}
                  <Input
                    placeholder="Add tags..."
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    onSubmitEditing={handleAddTag}
                    inputStyle={{ color: '#fff' }}
                  />
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {tags.map((tag) => (
                      <Chip
                        key={tag}
                        title={tag}
                        type="flat"
                        onPress={() => handleRemoveTag(tag)}
                        icon='close'
                        textStyle={{ color: '#fff' }}
                        style={{ color: '#fff' }}
                      >{tag}</Chip>
                    ))}
                  </View>
                  <TextInput multiline={true} numberOfLines={3} placeholder="Note" mode='outlined' style={styles.textInputNote} />
                  <TextInput placeholder='Commessa*' style={styles.textInputConsuntivazione}></TextInput>
                  <TextInput placeholder='Numero di ticket' style={styles.textInputConsuntivazione}></TextInput>
                  <Divider></Divider>
                  <View style={styles.horizontalContainer}>
                    <IconButton icon={documentCollapsed ? 'chevron-right' : 'chevron-down'} onPress={openDocumentInput}></IconButton>
                    <Text style={styles.documentLabel}>Allegati</Text>
                    <Button icon="calendar" mode="contained" onPress={openEndSelector} style={{ height: 35, marginLeft: 420, marginTop: 5 }}>
                      Data analisi
                    </Button>
                  </View>
                  {documentVisible ? <View style={styles.horizontalContainer} >
                    <TextInput placeholder='Nome*' style={styles.documentInput}></TextInput>
                    <TextInput placeholder='Estensione*' style={styles.documentInput}></TextInput>
                  </View> : null
                  }
                  {documentVisible ? <TextInput placeholder='URL' mode='outlined' style={styles.documentInput} />
                    : null}
                  {documentVisible ? <Button style={{ alignSelf: 'flex-end' }}>Salva allegato</Button> : null}
                  <View style={styles.horizontalContainer}>
                    <TextInput placeholder='Tempo stimato*' style={styles.timeInput} />
                    <TextInput placeholder='Tempo consuntivabile' style={styles.timeInput}></TextInput>
                    <Text style={styles.timeLabel}>TM?</Text>
                    <View style={{ marginTop: 6 }}>
                      <Checkbox status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                        style={{ paddingTop: 55 }} />
                    </View>
                  </View>
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} >Close</Button>
              <Button onPress={saveTask}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <StatusBar style="auto" />
      </View >
    </Provider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  accordionSelector: {
    //borderRadius: 15,
  },
  accordionSelectorContainer: {
    marginRight: 25,
    borderRadius: 15,
  },
  titleText: {
    marginBottom: 15,
    marginLeft: 40,
    marginTop: 40,
    fontFamily: 'Manrope',
    fontWeight: 'bolder',
    fontSize: 24,
    color: '#CAC4C8'
  },
  textInputNote: {
    marginTop: 15,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  textInputConsuntivazione: {
    marginHorizontal: 10,
    width: '35%',
    marginTop: 10
  },
  selectorLabel: {
    fontFamily: 'Manrope',
    color: '#CAC4C8',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10
  },
  scrollViewContent: {
    flexGrow: 1, // Allow the content to grow within the ScrollView
    justifyContent: 'center', // Center the content vertically if needed
  },
  documentLabel: {
    fontFamily: 'Manrope',
    color: '#CAC4C8',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10
  },
  documentInput: {
    marginLeft: 30,
    marginBottom: 10,
  },
  timeLabel: {
    fontFamily: 'Manrope',
    color: '#CAC4C8',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 30,
    marginTop: 10,
    marginRight: 15
  },
  timeInput: {
    marginLeft: 5,
    marginRight: 10
  }
});
