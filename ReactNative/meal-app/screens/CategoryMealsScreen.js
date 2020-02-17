import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../componenets/MealItem';

const CategoryMealScreen = props => {
	const catId = props.navigation.getParam('categoryId');
	const displayedMeals = MEALS.filter(
		meal => meal.categoryIds.indexOf(catId) >= 0
	);

	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
	navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
	return {
		headerTitle: selectedCategory.title,
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
	};
};

export default CategoryMealScreen;
