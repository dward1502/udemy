import React from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	Image
} from 'react-native';

import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../componenets/HeaderButton';
import DefaultText from '../componenets/DefaultText';

const MealDetailScreen = props => {
	const mealId = props.navigation.getParam('mealId');
	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	return (
		<ScrollView style={styles.screen}>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={{ ...styles.mealRow, ...styles.mealDetail }}>
				<DefaultText>{props.duration}m</DefaultText>
				<DefaultText>{props.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{props.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			<Text>List of ingredients...</Text>
			
			<Text style={styles.title}>Steps</Text>
			<Text>List of steps...</Text>
			<Text>{selectedMeal.title}</Text>
			<Button
				title='Go Back to Categories'
				onPress={() => {
					props.navigation.popToTop();
				}}
			/>
		</ScrollView>
	);
};

MealDetailScreen.navigationOptions = navigationData => {
	const mealId = navigationDatanavigation.getParam('mealId');
	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	return {
		headerTitle: selectedMeal.title,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Favorite'
					iconName='ios-star'
					onPress={() => {
						console.log('Log as favorite');
					}}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: '100%',
		height: 200
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	}
});

export default MealDetailScreen;
