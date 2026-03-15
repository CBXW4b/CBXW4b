// screens/MusicoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

const MusicoScreen = () => {
  const [url, setUrl] = useState('');
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');

  async function playFromUrl() {
    if (!url.trim()) {
      Alert.alert('Error', 'Masukkan URL YouTube');
      return;
    }
    try {
      if (sound) await sound.unloadAsync();
      
      // Convert YouTube to audio (simulasi, real perlu backend)
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setCurrentTrack(url);
    } catch (error) {
      Alert.alert('Gagal', 'URL tidak valid');
    }
  }

  async function pickLocalFile() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/mpeg', 'audio/wav'],
      });

      if (result.type === 'success') {
        if (sound) await sound.unloadAsync();
        
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: result.uri },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);
        setCurrentTrack(result.name);
      }
    } catch (err) {
      Alert.alert('Error', 'Gagal ambil file');
    }
  }

  async function togglePlayPause() {
    if (sound) {
      if (isPlaying) await sound.pauseAsync();
      else await sound.playAsync();
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.playerCard}>
        <Text style={styles.nowPlaying}>NOW PLAYING</Text>
        <Text style={styles.trackName}>{currentTrack || 'No Track'}</Text>

        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlayPause} disabled={!sound} style={[styles.controlButton, !sound && styles.disabled]}>
            <Text style={styles.controlText}>{isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>URL YOUTUBE</Text>
        <TextInput
          style={styles.input}
          placeholder="https://youtube.com/watch?v=..."
          placeholderTextColor="#555"
          value={url}
          onChangeText={setUrl}
        />
        <TouchableOpacity style={styles.actionButton} onPress={playFromUrl}>
          <Text style={styles.actionButtonText}>🎵 STREAM URL</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>FILE LOKAL</Text>
        <TouchableOpacity style={styles.actionButton} onPress={pickLocalFile}>
          <Text style={styles.actionButtonText}>📂 PILIH MP3/WAV</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stickyNote}>
        <Text style={styles.noteText}>🎧 Mini-player aktif di semua halaman</Text>
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
  playerCard: {
    backgroundColor: '#0f0f0f',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff99',
    marginBottom: 30,
    alignItems: 'center',
  },
  nowPlaying: {
    color: '#888',
    fontSize: 12,
  },
  trackName: {
    color: '#00ff99',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
  },
  controlButton: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00ff99',
  },
  disabled: {
    opacity: 0.5,
  },
  controlText: {
    color: '#00ff99',
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    color: '#aa00ff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ff99',
  },
  actionButtonText: {
    color: '#00ff99',
  },
  stickyNote: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aa00ff',
    alignItems: 'center',
  },
  noteText: {
    color: '#aa00ff',
    fontSize: 12,
  },
});

export default MusicoScreen;
