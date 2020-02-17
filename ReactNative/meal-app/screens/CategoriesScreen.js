import React from 'react';
import {
	FlatList,
	StyleSheet,	
} from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../componenets/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../componenets/HeaderButton';

const CategoriesScreen = props => {
	const renderGridItem = itemData => {
		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.color}
				onSelect={() => {
					props.navigation.navigate({
						routeName: 'CategoryMeals',
						params: {
							categoryId: itemData.item.id
						}
					});
				}}
			/>
		);
	};

	return (
		<FlatList
			keyExtractor={(item, index) => item.id}
			data={CATEGORIES}
			renderItem={renderGridItem}
			numColumns={2}
		/>
	);
};

CategoriesScreen.navigationOptions = (navData) => {
	headerTitle: 'Meal Categories',
	headerLeft: (
		<HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item title='Menu' iconName='ios-menu' onPress={() => {
				navData.navigation.toggleDrawer();
			}}/>
		</HeaderButtons>
	)
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CategoriesScreen;
