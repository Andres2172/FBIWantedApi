// componentes/Original.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function Original() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWanted = async () => {
      try {
        const res = await fetch('https://api.fbi.gov/@wanted?pageSize=10');
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
        {item.subjects?.length ? (
          <Text style={styles.subject}>{item.subjects.join(', ')}</Text>
        ) : null}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10, color: '#555' }}>Cargando lista...</Text>
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
  title: { fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 10 },
  image: { width: 100, height: 130, resizeMode: 'contain', alignSelf: 'center', marginBottom: 10 },
  noImage: {
    width: 100,
    height: 130,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  noImageText: { color: '#999', fontSize: 13 },
  subject: { fontSize: 12, color: '#555', textAlign: 'center', marginTop: 5 },
});