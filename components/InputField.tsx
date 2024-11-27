import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
  isInvalid?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  isInvalid = false,
}) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    style={[styles.input, isInvalid && styles.inputInvalid]}
    placeholderTextColor="#aaa"
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#333",
  },
  inputInvalid: {
    borderColor: "red",
  },
});

export default InputField;
