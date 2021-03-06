import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,KeyboardAvoidingView, Image } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import SearchInput, { createFilter } from 'react-native-search-filter';
import projects from './projects';

const KEYS_TO_FILTERS = ['title', 'tags']

class RecruitProject extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      searchTerm:''
    };
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }   
  render() { 
    const filteredFriends = projects.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const { navigation } = this.props;

    return (
      <View>   
      <KeyboardAvoidingView>
        <SearchInput
          onChangeText={(term) => {this.searchUpdated(term)}}
          style={styles.searchInput}
          placeholder="Search Projects (ex. 스키)"
        />
      </KeyboardAvoidingView> 
        <ScrollView>
          {filteredFriends.map(projects => {
            return(
              <TouchableOpacity onPress={() => navigation('ProjectDetail', {
                itemId : projects.id
              })} 
              key={projects.id} 
              style={styles.emailItem}>
                <View style={{ height: 200, borderWidth: 0.5, borderColor: '#dddddd', marginTop:10 }}>
                  <View style={{ flex: 3 }}>
                      <Image source={{uri : projects.file}}
                          style={{ flex: 1, resizeMode: 'cover'}}
                      />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize: 17 }}>{projects.title}</Text>
                    <Text style={{ fontSize: 14, marginTop:2 }}>#{projects.tags[0]} #{projects.tags[1]} #{projects.tags[2]}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

export default RecruitProject;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'flex-start'
    },
    emailItem:{
      borderBottomWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.3)',
      padding: 10
    },
    emailSubject: {
      color: 'rgba(0,0,0,0.5)'
    },
    searchInput:{
      padding: 10,
      borderColor: '#CCC',
      borderWidth: 1,
      borderRadius : 5
    }
  });