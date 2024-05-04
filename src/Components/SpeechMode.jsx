import { View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import Vosk from "react-native-vosk";

const actions = ["left", "right", "forward", "stop"];

const SpeechMode = ({ onSpeechResults }) => {
	const [isReady, setIsReady] = useState(false);
	const [isListening, setIsListening] = useState(false);

	const vosk = useRef(new Vosk()).current;

	useEffect(() => {
		vosk
			.loadModel("model-en")
			.then(() => {
				setIsReady(true);
			})
			.catch((error) => {
				console.error(error);
			});

		const resultEvent = vosk.onResult((res) => {
			console.log("onResult " + res);
			onSpeechResults(res.split(" ")[0]);
			// setResult(res);
		});

		const errorEvent = vosk.onError((e) => {
			console.error(e);
		});

		const timeoutEvent = vosk.onTimeout(() => {
			console.log("Recognizer timed out");
			// setRecognizing(false);
		});

		return () => {
			resultEvent.remove();
			errorEvent.remove();
			timeoutEvent.remove();
		};
	}, [vosk]);

	const handleSpeechStart = () => {
		if (!isReady) return;

		if (isListening) {
			vosk.stop();
			setIsListening(false);
			return;
		}

		vosk
			.start({
				grammar: actions,
			})
			.then((result) => {
				console.log({ result });
				setIsListening(true);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<View>
			<TouchableOpacity onPress={handleSpeechStart}>
				<FontAwesome6
					name="microphone"
					size={24}
					color={isListening ? "#46cf76" : "#ccc"}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SpeechMode;
