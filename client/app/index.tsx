// Главная страница (очищенная версия)
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/blocks/Header';
import SideMenu from '../components/blocks/SideMenu';
import SearchInput from '../components/ui/SearchInput';
import BannerCarousel from '@/components/blocks/BannerCarousel';
import RestaurantCard from '../components/blocks/RestaurantCard';
import { API_URL } from '@env';

function isRestaurantOpen(worktime) {
  if (!worktime) return false;

  const now = new Date();
  const day = now.getDay(); // 0 - вс, 1-5 будни, 6 - сб
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTotal = hours * 60 + minutes;

  let schedule;

  switch (day) {
    case 0:
      schedule = worktime.sunday;
      break;
    case 6:
      schedule = worktime.saturday;
      break;
    default:
      schedule = worktime.weekdays;
  }

  if (!schedule) return false;

  // Ожидаем формат "HH:MM-HH:MM"
  // На всякий случай чистим пробелы и разные символы
  const cleaned = schedule
    .replace(/\s/g, "")
    .replace(/\./g, ":")
    .replace(/—|–/g, "-");

  const [startStr, endStr] = cleaned.split("-");
  if (!startStr || !endStr) return false;

  const [sh, sm] = startStr.split(":").map((v) => parseInt(v, 10));
  const [eh, em] = endStr.split(":").map((v) => parseInt(v, 10));

  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return false;

  const startTotal = sh * 60 + sm;
  const endTotal = eh * 60 + em;

  return currentTotal >= startTotal && currentTotal <= endTotal;
}

export default function RestaurantsScreen() {
  const [activeTab, setActiveTab] = useState("all");
  const [menuVisible, setMenuVisible] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // 📡 Загрузка ресторанов
  const fetchRestaurants = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_URL}/api/restaurant/all?search=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Ошибка при загрузке ресторанов:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 При вводе в поиск
  useEffect(() => {
    fetchRestaurants(searchQuery);
  }, [searchQuery]);

  // ⏳ Первый запуск
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // ⚡ Фильтрация по табам
  const filteredRestaurants =
    activeTab === "open"
      ? restaurants.filter((r) => isRestaurantOpen(r.worktime))
      : restaurants;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#CDE589"
          style={{ marginTop: 40 }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Header onMenuPress={() => setMenuVisible(true)} />
        <SearchInput onSearch={setSearchQuery} />
        <BannerCarousel />

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab("all")}>
            <Text
              style={[styles.tab, activeTab === "all" && styles.activeTab]}
            >
              Все
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("open")}>
            <Text
              style={[styles.tab, activeTab === "open" && styles.activeTab]}
            >
              Работают сейчас
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {filteredRestaurants.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Text style={{ color: "#777" }}>Ничего не найдено</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          numColumns={3}
          renderItem={({ item }) => (
            <RestaurantCard
              _id={item._id}
              name={item.name}
              rating={4.8}
              reviews={163}
              hours={item.worktime.weekdays}
              image={{ uri: item.image }}
              // можно передать флаг, если хочешь показывать "Открыт/Закрыт" внутри карточки
              openNow={isRestaurantOpen(item.worktime)}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
      )}

      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  header: { backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingBottom: 10 },
  flatList: { marginTop: 10 },
  tabs: { flexDirection: "row", marginBottom: 12 },
  tab: {
    fontSize: 12,
    color: "#777",
    marginRight: 16,
    paddingBottom: 4,
    paddingLeft: 10,
  },
  activeTab: { color: "#000", borderBottomWidth: 2, borderBottomColor: "#CDE589" },
  columnWrapper: { justifyContent: "space-between", paddingHorizontal: 16 },
  listContent: { paddingBottom: 100 },
});