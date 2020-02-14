import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton'

const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<BodyText>The Game is Over</BodyText>
			<View style={styles.imageContainer}>
				{/* <Image fadeDuration={1000} source={{uri:'https://cdn.pixabay.com/photo/2016/0/05/23/52/mountain-summit-1275015_960_720.jpg'}} style={styles.image} resizeMode='cover'/> */}
				<Image source={require('../assets/success.png')} style={styles.image} />
			</View>
			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed<Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the
					number
					<Text style={styles.highlight}>{props.userNumber}</Text>
				</BodyText>
			</View>
			<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainer: {
		borderRadius: 200,
		borderWidth: 3,
		borderColor: 'black',
		width: 300,
		height: 300,
		overflow: 'hidden',
		marginVertical: 30
	},
	image: {
		width: '100%',
		height: '100%'
	},
	highlight: {
		color: Colors.primary
  },
  resultContainer: {
    width:'80%'
  },
  resultText:{
    textAlign:'center'
  }
});

export default GameOverScreen;
