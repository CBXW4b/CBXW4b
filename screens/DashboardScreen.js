// screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState({ ram: 0, cpu: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        ram: Math.random() * 4 + 2,
        cpu: Math.random() * 30 + 10,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const ModeButton = ({ title, target, color }) => (
    <TouchableOpacity
      style={[styles.modeButton, { borderColor: color }]}
      onPress={() => navigation.navigate(target)}
    >
      <Text style={[styles.modeButtonText, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>SYSTEM STATUS</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>RAM Usage:</Text>
          <Text style={styles.statValue}>{stats.ram.toFixed(2)} GB</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>CPU Load:</Text>
          <Text style={styles.statValue}>{stats.cpu.toFixed(1)}%</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>QUICK ACCESS MODES</Text>
      <View style={styles.modeGrid}>
        <ModeButton title="⚡ FLASH" target="Utama" color="#00ff99" />
        <ModeButton title="🔥 PRO" target="Utama" color="#ffaa00" />
        <ModeButton title="🍌 NANO BANANA" target="Utama" color="#aa00ff" />
        <ModeButton title="🌀 BETA DEEP" target="Utama" color="#ff44aa" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  statsCard: {
    backgroundColor: '#0f0f0f',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff99',
    marginBottom: 30,
  },
  statsTitle: {
    color: '#00ff99',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    color: '#888',
    fontSize: 16,
  },
  statValue: {
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#aa00ff',
    fontSize: 18,
    marginBottom: 15,
  },
  modeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modeButton: {
    width: '48%',
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
