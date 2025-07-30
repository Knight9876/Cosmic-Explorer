import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export const GlobalDisclaimer = () => (
    <Text style={styles.disclaimerText}>
      Disclaimer: All astronomical data in this app is provided for educational use. While
      we strive for accuracy, some values (such as mass, orbit, and composition)
      are simplified or based on public databases. Real scientific values may
      vary due to ongoing discoveries, data refinement, and observational
      limitations. Use this app as a learning tool — not for precise
      calculations.
    </Text>
);

const styles = StyleSheet.create({
disclaimerText: {
  fontSize: 14,
  color: '#444',
  lineHeight: 20,
  fontStyle: 'italic',
},
});
