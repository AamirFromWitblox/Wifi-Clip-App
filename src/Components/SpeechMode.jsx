import {
	View,
	Text,
	Button,
	TouchableOpacity,
	PermissionsAndroid,
} from "react-native";
import React, { useEffect } from "react";
import Voice from "@react-native-voice/voice";
import { FontAwesome6 } from "@expo/vector-icons";

const SpeechMode = () => {
	useEffect(() => {
		Voice.onSpeechStart = onSpeechStart;
		Voice.onSpeechEnd = onSpeechEnd;
		Voice.onSpeechResults = onSpeechResults;
		Voice.onSpeechError = onSpeechError;
		Voice.onSpeechPartialResults = onSpeechPartialResults;
		Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

		return () => {
			Voice.destroy().then(Voice.removeAllListeners);
		};
	}, []);

	const onSpeechStart = (e) => {
		console.log("onSpeechStart: ", e);
	};

	const onSpeechEnd = (e) => {
		console.log("onSpeechEnd: ", e);
	};

	const onSpeechResults = (e) => {
		console.log("onSpeechResults: ", e);
	};

	const onSpeechError = (e) => {
		console.log("onSpeechError: ", e);
	};

	const onSpeechPartialResults = (e) => {
		console.log("onSpeechPartialResults: ", e);
	};

	const onSpeechVolumeChanged = (e) => {
		console.log("onSpeechVolumeChanged: ", e);
	};

	const requestAudioPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
				{
					title: "Audio Permission",
					message: "This app requires audio permission",
					buttonNeutral: "Ask Me Later",
					buttonNegative: "Cancel",
					buttonPositive: "OK",
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the audio");
			} else {
				console.log("Audio permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	};

	return (
		<View>
			<TouchableOpacity onPress={Voice.start}>
				<FontAwesome6 name="microphone" size={24} color="#ccc" />
			</TouchableOpacity>
		</View>
	);
};

export default SpeechMode;
