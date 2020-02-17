import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../componenets/HeaderButton';

const FiltersScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <View style={styles.filterContainer}> 
        <Text>Gluten free</Text>
        <Switch />
      </View>
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Meal Filter!',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName='ios-menu'
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({git ad
    fontSize:22,
    margin:20,
    textAlign:'center'
  },filterContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'80%'
  }
});

export default FiltersScreen;
