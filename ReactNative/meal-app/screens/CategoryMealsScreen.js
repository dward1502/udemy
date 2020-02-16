import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../componenets/MealItem';

const CategoryMealScreen = (props) => {
	const renderMealItem = (itemData) => {
		return (
			<MealItem
				title={itemData.item.title}
				image={itemData.item.imageUrl}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity.toUpperCase()}
				affordability={itemData.item.affordability.toUpperCase()}
				onSelect={() => {
					props.navigation.navigate({routeName:'MealDetail', params:{
						mealId:itemData.item.id
					}})
				}}
			/>
		);
	};
	const catId = props.navigation.getParam('categoryId');
	const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

	return (
		<View style={styles.screen}>
			<FlatList
				data={displayedMeals}
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItem}
				style={{ width: '100%' }}
			/>
		</View>
	);
};

CategoryMealScreen.navigationOptions = (navigationData) => {
	navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
	return {
		headerTitle: selectedCategory.title,
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CategoryMealScreen;
