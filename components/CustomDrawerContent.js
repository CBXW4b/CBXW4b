// components/CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Svg, { Path } from 'react-native-svg';

const LogoutIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M16 17L21 12L16 7" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M21 12H9" stroke="#ff4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>ZORRR BLACK</Text>
        <Text style={styles.drawerSubtitle}>OS v1.0</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.drawerFooter}>
        <TouchableOpacity onPress={() => props.onLogout()} style={styles.logoutButton}>
          <LogoutIcon />
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>
        <Text style={styles.copyright}>© STR 2026</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#00ff99',
    marginBottom: 10,
  },
  drawerTitle: {
    color: '#00ff99',
    fontSize: 22,
    fontWeight: 'bold',
  },
  drawerSubtitle: {
    color: '#aa00ff',
    fontSize: 12,
  },
  drawerFooter: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutText: {
    color: '#ff4444',
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyright: {
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 10,
  },
});

export default CustomDrawerContent;
