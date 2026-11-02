
import React, { useState, createContext, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Share,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

type Movie = {
  id: string;
  title: string;
  year: string;
  duration: string;
  rating: string;
  description: string;
  image: string;
  backdrop: string;
};

type RootStackParamList = {
  MainTabs: undefined;
  MovieDetails: { movie: Movie };
};

type TabParamList = {
  Home: undefined;
  Search: undefined;
  'My Netflix': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const movies: Movie[] = [
  {
    id: '1',
    title: 'The Hobbit: An Unexpected Journey',
    year: '2012',
    duration: '2h 49m',
    rating: 'PG-13',
    description:
      'Bilbo Baggins joins a group of dwarves on an unexpected adventure to reclaim their homeland.',
    image:
      'https://image.tmdb.org/t/p/w500/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg',
  },
  {
    id: '2',
    title: 'Sinners',
    year: '2025',
    duration: '2h 17m',
    rating: 'R',
    description:
      'Twin brothers return to their hometown hoping to leave their troubled lives behind.',
    image:
      'https://image.tmdb.org/t/p/w500/yqsCU5XOP2mkbFamzAqbqntmfav.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/yqsCU5XOP2mkbFamzAqbqntmfav.jpg',
  },
  {
    id: '3',
    title: 'Godzilla Minus One',
    year: '2023',
    duration: '2h 5m',
    rating: 'PG-13',
    description:
      'Postwar Japan faces a terrifying new threat when Godzilla appears.',
    image:
      'https://image.tmdb.org/t/p/w500/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg',
  },
  {
    id: '4',
    title: 'Nosferatu',
    year: '2024',
    duration: '2h 12m',
    rating: 'R',
    description:
      'A gothic tale of obsession between a haunted young woman and a terrifying vampire.',
    image:
      'https://image.tmdb.org/t/p/w500/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg',
  },
  {
    id: '5',
    title: 'The Dark Knight',
    year: '2008',
    duration: '2h 32m',
    rating: 'PG-13',
    description:
      'Batman, Lt. Gordon and District Attorney Harvey Dent go up against the Joker, a criminal mastermind terrorizing Gotham City.',
    image:
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: '6',
    title: 'Batman Begins',
    year: '2005',
    duration: '2h 20m',
    rating: 'PG-13',
    description:
      'Bruce Wayne begins his journey to become the protector of Gotham City.',
    image:
      'https://image.tmdb.org/t/p/w500/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg',
  },
  {
    id: '7',
    title: 'The Dark Knight Rises',
    year: '2012',
    duration: '2h 44m',
    rating: 'PG-13',
    description:
      'Batman returns to defend Gotham against a powerful new enemy.',
    image:
      'https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg',
    backdrop:
      'https://image.tmdb.org/t/p/w1280/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg',
  },
];

type ListContextType = {
  saved: string[];
  toggleSaved: (id: string) => void;
};

const ListContext = createContext<ListContextType>({
  saved: [],
  toggleSaved: () => {},
});

function useMyList() {
  return useContext(ListContext);
}

function openMovie(navigation: any, movie: Movie) {
  navigation.navigate('MovieDetails', { movie });
}

function Header({ title, home = false }: { title: string; home?: boolean }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {home && <Text style={styles.netflixLogo}>N</Text>}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => Alert.alert('Cast', 'Demo feature')}>
          <Ionicons name="tv-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Downloads', 'No downloads yet')}>
          <Ionicons name="download-outline" size={27} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Notifications', 'No new notifications')}>
          <Ionicons name="notifications-outline" size={27} color="white" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>12</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MoviePoster({
  movie,
  width = 130,
  height = 190,
}: {
  movie: Movie;
  width?: number;
  height?: number;
}) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={{ marginRight: 12 }}
      onPress={() => openMovie(navigation, movie)}
    >
      <Image
        source={{ uri: movie.image }}
        style={{ width, height, borderRadius: 7, backgroundColor: '#252525' }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

function MovieSection({
  title,
  data,
}: {
  title: string;
  data: Movie[];
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(movie => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
}

function HomeScreen() {
  const navigation = useNavigation<any>();
  const { saved, toggleSaved } = useMyList();
  const featured = movies[0];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" home />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>TV Shows</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Movies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryPill}>
            <Text style={styles.categoryText}>Categories ⌄</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.95}
          onPress={() => openMovie(navigation, featured)}
        >
          <Image
            source={{ uri: featured.backdrop }}
            style={styles.featuredImage}
          />

          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTitle}>THE HOBBIT</Text>
            <Text style={styles.featuredSubtitle}>
              AN UNEXPECTED JOURNEY
            </Text>
            <Text style={styles.featuredRanking}>#2 in Movies Today</Text>

            <View style={styles.featuredButtons}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => Alert.alert('Play Movie', 'Playback demo')}
              >
                <Ionicons name="play" size={23} color="black" />
                <Text style={styles.playText}>Play Movie</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.listButton}
                onPress={() => toggleSaved(featured.id)}
              >
                <Ionicons
                  name={saved.includes(featured.id) ? 'checkmark' : 'add'}
                  size={25}
                  color="white"
                />
                <Text style={styles.listText}>My List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        <MovieSection title="New on Netflix" data={movies.slice(1, 5)} />
        <MovieSection title="Trending Now" data={movies.slice(2, 7)} />
        <MovieSection title="Popular Movies" data={movies} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SearchScreen() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Search" />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={25} color="#aaa" />
        <TextInput
          placeholder="Search shows, movies, games..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={23} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.searchHeading}>
        {search ? 'Search Results' : 'Recommended TV Shows & Movies'}
      </Text>

      <FlatList
        data={filteredMovies}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.emptyText}>No movies found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.searchMovie}
            onPress={() => openMovie(navigation, item)}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.searchImage}
              resizeMode="cover"
            />
            <Text style={styles.searchMovieTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Ionicons
              name="play-circle-outline"
              size={38}
              color="white"
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

function ContinueWatchingCard({ movie }: { movie: Movie }) {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.continueCard}
      onPress={() => openMovie(navigation, movie)}
    >
      <View>
        <Image
          source={{ uri: movie.image }}
          style={styles.continueImage}
        />
        <View style={styles.centerPlay}>
          <Ionicons name="play-circle" size={50} color="white" />
        </View>
      </View>
      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>
      <View style={styles.continueBottom}>
        <Ionicons name="information-circle-outline" size={25} color="white" />
        <Ionicons name="ellipsis-vertical" size={23} color="white" />
      </View>
    </TouchableOpacity>
  );
}

function MyNetflixScreen() {
  const { saved } = useMyList();
  const savedMovies = movies.filter(movie => saved.includes(movie.id));

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Juan ▾" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.downloadCard}
          onPress={() => Alert.alert('Downloads', 'Your downloads appear here.')}
        >
          <Ionicons name="download-outline" size={34} color="white" />
          <View style={{ flex: 1, marginLeft: 18 }}>
            <Text style={styles.downloadTitle}>Downloads</Text>
            <Text style={styles.downloadSubtitle}>
              Shows and movies that you download appear here.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={28} color="white" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Continue Watching</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[movies[1], movies[3], movies[4]].map(movie => (
              <ContinueWatchingCard key={movie.id} movie={movie} />
            ))}
          </ScrollView>
        </View>

        <MovieSection
          title="TV Shows & Movies You've Liked"
          data={[movies[0], movies[2], movies[4]]}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My List</Text>
          {savedMovies.length === 0 ? (
            <Text style={styles.emptyListText}>
              Movies you add to My List will appear here.
            </Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {savedMovies.map(movie => (
                <MoviePoster key={movie.id} movie={movie} />
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MovieDetailsScreen({ route, navigation }: any) {
  const { movie } = route.params as { movie: Movie };
  const { saved, toggleSaved } = useMyList();

  const relatedMovies = movies.filter(item => item.id !== movie.id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsHero}>
          <Image
            source={{ uri: movie.backdrop }}
            style={styles.detailsImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContent}>
          <Text style={styles.detailsTitle}>{movie.title}</Text>

          <View style={styles.movieMetadata}>
            <Text style={styles.metadataText}>{movie.year}</Text>
            <Text style={styles.ratingBox}>{movie.rating}</Text>
            <Text style={styles.metadataText}>{movie.duration}</Text>
            <Text style={styles.hdBox}>HD</Text>
          </View>

          <TouchableOpacity
            style={styles.resumeButton}
            onPress={() => Alert.alert('Resume', 'Movie playback demo')}
          >
            <Ionicons name="play" size={25} color="black" />
            <Text style={styles.resumeText}>Resume</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => Alert.alert('Download', 'Download demo')}
          >
            <Ionicons name="download-outline" size={25} color="white" />
            <Text style={styles.downloadButtonText}>Download</Text>
          </TouchableOpacity>

          <View style={styles.detailsProgress}>
            <View style={styles.detailsProgressFill} />
          </View>

          <Text style={styles.description}>{movie.description}</Text>

          <Text style={styles.castText}>
            Cast: Featured actors and performers
          </Text>
          <Text style={styles.castText}>Available in HD</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => toggleSaved(movie.id)}
            >
              <Ionicons
                name={saved.includes(movie.id) ? 'checkmark' : 'add'}
                size={32}
                color="white"
              />
              <Text style={styles.actionLabel}>My List</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => Alert.alert('Rate', 'Thanks for your rating!')}
            >
              <Ionicons name="thumbs-up-outline" size={30} color="white" />
              <Text style={styles.actionLabel}>Rate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionItem}
              onPress={() =>
                Share.share({ message: `Check out ${movie.title}!` })
              }
            >
              <Ionicons name="paper-plane-outline" size={30} color="white" />
              <Text style={styles.actionLabel}>Share</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.redUnderline} />
          <Text style={styles.sectionTitle}>More Like This</Text>

          <View style={styles.relatedGrid}>
            {relatedMovies.map(item => (
              <View key={item.id} style={{ width: '32%', marginBottom: 12 }}>
                <MoviePoster movie={item} width={105} height={155} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#181818',
          borderTopColor: '#333',
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Home') icon = 'home-outline';
          if (route.name === 'Search') icon = 'search-outline';
          if (route.name === 'My Netflix') icon = 'person-circle-outline';

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="My Netflix" component={MyNetflixScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [saved, setSaved] = useState<string[]>(['5']);

  function toggleSaved(id: string) {
    setSaved(previous =>
      previous.includes(id)
        ? previous.filter(item => item !== id)
        : [...previous, id]
    );
  }

  return (
    <ListContext.Provider value={{ saved, toggleSaved }}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ListContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  netflixLogo: {
    fontSize: 38,
    fontWeight: '900',
    color: '#E50914',
    marginRight: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 29,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: -9,
    right: -9,
    backgroundColor: '#E50914',
    borderRadius: 12,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  categoryPill: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  categoryText: {
    color: 'white',
    fontSize: 13,
  },
  featuredCard: {
    height: 490,
    marginHorizontal: 18,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginBottom: 22,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    paddingTop: 90,
    backgroundColor: 'rgba(0,0,0,0.58)',
    alignItems: 'center',
  },
  featuredTitle: {
    color: '#e6c69d',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  featuredSubtitle: {
    color: '#e6c69d',
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 15,
  },
  featuredRanking: {
    color: 'white',
    fontSize: 16,
    marginBottom: 18,
  },
  featuredButtons: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  playButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  playText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listButton: {
    flex: 1,
    backgroundColor: '#444',
    borderRadius: 30,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  listText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
    paddingLeft: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  searchContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 17,
    marginLeft: 10,
  },
  searchHeading: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    marginHorizontal: 18,
    marginTop: 22,
    marginBottom: 12,
  },
  searchMovie: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 12,
    gap: 15,
  },
  searchImage: {
    width: 135,
    height: 83,
    borderRadius: 6,
    backgroundColor: '#222',
  },
  searchMovieTitle: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 35,
  },
  downloadCard: {
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    margin: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  downloadSubtitle: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 8,
  },
  continueCard: {
    width: 145,
    backgroundColor: '#171717',
    borderRadius: 6,
    marginRight: 10,
    overflow: 'hidden',
  },
  continueImage: {
    width: 145,
    height: 195,
  },
  centerPlay: {
    position: 'absolute',
    top: 70,
    left: 47,
  },
  progressBackground: {
    height: 4,
    backgroundColor: '#777',
  },
  progressFill: {
    height: 4,
    width: '65%',
    backgroundColor: '#E50914',
  },
  continueBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  emptyListText: {
    color: '#aaa',
    fontSize: 14,
    paddingVertical: 20,
  },
  detailsHero: {
    height: 260,
    backgroundColor: '#171717',
  },
  detailsImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 25,
    padding: 5,
  },
  detailsContent: {
    padding: 16,
  },
  detailsTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  movieMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  metadataText: {
    color: '#ddd',
    fontSize: 14,
  },
  ratingBox: {
    color: '#ddd',
    backgroundColor: '#444',
    fontSize: 11,
    padding: 4,
  },
  hdBox: {
    color: '#aaa',
    borderWidth: 1,
    borderColor: '#aaa',
    paddingHorizontal: 4,
    fontSize: 12,
  },
  resumeButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 12,
  },
  resumeText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#333',
    borderRadius: 30,
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsProgress: {
    backgroundColor: '#666',
    height: 4,
    marginTop: 28,
    marginBottom: 20,
  },
  detailsProgressFill: {
    backgroundColor: '#E50914',
    height: 4,
    width: '65%',
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 15,
  },
  castText: {
    color: '#888',
    fontSize: 13,
    marginBottom: 5,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  actionItem: {
    alignItems: 'center',
    gap: 8,
  },
  actionLabel: {
    color: 'white',
    fontSize: 13,
  },
  redUnderline: {
    backgroundColor: '#E50914',
    width: 90,
    height: 4,
    marginBottom: 15,
  },
  relatedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
