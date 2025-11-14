// componentes/Home.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWanted = async () => {
      try {
        const res = await fetch('https://api.fbi.gov/@wanted?pageSize=20');
        const json = await res.json();
        setData(json.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWanted();
  }, []);

  const renderItem = ({ item }) => {
    const img = item.images?.[0]?.original;
    return (
      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        {img ? (
          <Image source={{ uri: img }} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.noImageText}>Sin imagen</Text>
          </View>
        )}
        {item.reward_text ? <Text style={styles.reward}>Recompensa: {item.reward_text}</Text> : null}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#555' }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid || item.title}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 12 },
  image: { width: 120, height: 150, resizeMode: 'contain', alignSelf: 'center', marginBottom: 12 },
  noImage: {
    width: 120,
    height: 150,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  noImageText: { color: '#999', fontSize: 14 },
  reward: { fontSize: 13, color: '#d32f2f', textAlign: 'center', fontWeight: '500' },
});