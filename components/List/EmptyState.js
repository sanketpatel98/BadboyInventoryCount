import React from 'react';
import { StyleSheet, Text } from 'react-native';

const EmptyState = () => {
  return (
    <Text style={styles.emptyText}>No scanned items yet.</Text>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});

export default EmptyState;
