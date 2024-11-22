import React, { useEffect, useState, createContext, useContext, useMemo} from 'react';
import { View, Text, Image, Button, TouchableOpacity, TextInput, ToastAndroid, ScrollView, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { NavigationProp } from '@react-navigation/native';
import { FlatList } from 'react-native';  
import { useDishes } from './DishesContext'
import { DishesProvider } from './DishesContext';
import { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native'; 

const sampleDishes = [
  { name: 'Celestial Carbonara', category: 'main', price: 120, description: 'A heavenly blend of creamy sauce, crispy pancetta, and al dente pasta.' },
  { name: 'Sapphire Salmon', category: 'main', price: 160, description: 'Grilled salmon fillet glazed with a tangy citrus sauce, served with seasonal vegetables.' },
  { name: 'Ruby Red Gazpacho', category: 'starter', price: 90, description: 'A refreshing cold tomato soup with hints of basil and a drizzle of olive oil.' },
  { name: 'Moonlit Mousse', category: 'dessert', price: 110, description: 'Silky chocolate mousse with a touch of orange zest and whipped cream.' },
  { name: 'Crimson Beet Tartare', category: 'starter', price: 80, description: 'A vibrant mix of roasted beets, fresh herbs, and citrus dressing.' },
  { name: 'Velvet Truffle Pasta', category: 'main', price: 200, description: 'Pasta tossed in a rich truffle cream sauce with a sprinkle of Parmesan.' },
  { name: 'Aurora Berry Parfait', category: 'dessert', price: 130, description: 'Layers of fresh berries, granola, and vanilla yogurt in a parfait glass.' },
  { name: 'Golden Herb Flatbread', category: 'starter', price: 75, description: 'Warm flatbread topped with a mix of herbs, garlic, and a touch of sea salt.' },
  { name: 'Midnight Lava Cake', category: 'dessert', price: 150, description: 'Molten chocolate cake with a gooey center, served with vanilla ice cream.' },
  { name: 'Topaz Tomato Bruschetta', category: 'starter', price: 95, description: 'Toasted bread topped with a medley of cherry tomatoes, basil, and balsamic glaze.' }
];

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    // Hide the splash screen after 3 seconds
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <DishesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Choice"
            component={Choice}
            options={{ title: 'Choose Role' }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'Christoffel' }}
          />
          <Stack.Screen
            name="Filter"
            component={FilterScreen}
            options={{ title: 'Filter Dishes' }}
          />
          <Stack.Screen
            name="CustomDish"
            component={CustomDishScreen}
            options={{ title: 'Add Custom Dish' }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ title: 'Payment' }}
          />
          <Stack.Screen
            name="AddToFilterScreen"
            component={AddToFilterScreen}
            options={{ title: 'Chef Screen' }}
          />
          <Stack.Screen
            name="StartersScreen"
            component={StartersScreen}
            options={{ title: 'Starters' }}
          />
          <Stack.Screen
            name="MainCourseScreen"
            component={MainCourseScreen}
            options={{ title: 'Main Courses' }}
          />
          <Stack.Screen
            name="DessertScreen"
            component={DessertScreen}
            options={{ title: 'Desserts' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DishesProvider>
  );
};

type Props = {
  navigation: NavigationProp<any>;
};

const Splash: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Choice'); // Use navigate instead of replace
    }, 3000);
  }, [navigation]);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B2B2B2' }}>
      <Image source={require('./assets/christofelopen.png')} />
    </View>
  );
};

const AddToFilterScreen: React.FC = () => {
  const { dishes, updateDishCount } = useDishes();  // Renamed from updateCount to updateDishCount
  console.log(dishes); // Debugging: Logs the fetched data

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#FFFFFF' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: 'black',
          textAlign: 'center',
          fontFamily: 'Georgia',
        }}
      >
        Manage Dishes
      </Text>

      {['dessert', 'main', 'starter'].map((category) => (
        <View key={category} style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              color: 'black',
            }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}s
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {dishes
              .filter((dish) => dish.category === category)
              .map((dish) => (
                <View
                  key={dish.id}
                  style={{
                    borderWidth: 1,
                    borderColor: '#000000',
                    borderRadius: 10,
                    width: '45%',
                    margin: 5,
                    backgroundColor: '#FFF',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={{ uri: dish.image }}
                    style={{ width: '100%', height: 150 }}
                  />
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      backgroundColor: '#000000',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        marginBottom: 5,
                        color: '#FFF',
                      }}
                    >
                      {dish.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#FFF',
                        marginBottom: 10,
                      }}
                    >
                      Price: R{dish.price}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => updateDishCount(dish.id, -1)}  
                        style={{
                          backgroundColor: '#E74C3C',
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>-</Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          marginHorizontal: 10,
                          color: '#FFF',
                          fontWeight: 'bold',
                        }}
                      >
                        {dish.count}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateDishCount(dish.id, 1)}  // Renamed to updateDishCount
                        style={{
                          backgroundColor: '#2ECC71',
                          padding: 10,
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const Choice: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#000000', // Christoffel yellow
          fontFamily: 'Georgia', // Elegant font for Christoffel brand
        }}
      >
        Choose Your Role
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#000000', // Christoffel dark gold color
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('AddToFilterScreen')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          CHEF
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#000000', // Christoffel dark gold color
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: '80%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Main')}
      >
        <Text
          style={{
            color: '#FFF', // White text for readability
            fontSize: 18,
          }}
        >
          USER
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateCategoryAverages = (category: string) => {
  const dishes = sampleDishes.filter(dish => dish.category === category);
  const totalDishes = dishes.length;
  const totalPrice = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const averagePrice = totalDishes > 0 ? totalPrice / totalDishes : 0;
  return { totalDishes, averagePrice: averagePrice.toFixed(2) };
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const { totalDishes: totalMainDishes, averagePrice: avgMainPrice } = calculateCategoryAverages('main');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFFFFF', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Christoffel</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={{ position: 'absolute', right: 10, top: 10 }}>
        <Text style={{ color: 'black', fontSize: 16 }}>Filter</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Image
          source={require('./assets/burger.png')}
          style={{ width: 348, height: 123, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'black', marginTop: 10 }}>Burger</Text>
        <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Price: R100</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Order" color="black" onPress={() => navigation.navigate('PaymentScreen')} />
        </View>

        <Image
          source={require('./assets/ribs.png')}
          style={{ width: 348, height: 123, marginTop: 30, borderRadius: 15 }}
        />
        <Text style={{ fontSize: 28, color: 'black', marginTop: 10 }}>Ribs</Text>
        <Text style={{ color: 'black', fontSize: 16, marginTop: 10 }}>Price: R100</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Order" color="black" onPress={() => navigation.navigate('PaymentScreen')} />
        </View>
      </View>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Button title="Custom Dish" color="black" onPress={() => navigation.navigate('CustomDish')} />
      </View>

      <Text style={{ color: 'black', marginTop: 20, textAlign: 'center' }}>Main Dishes: {totalMainDishes}</Text>
      <Text style={{ color: 'black', textAlign: 'center' }}>Average Price: R{avgMainPrice}</Text>
    </ScrollView>
  );
};
const FilterScreen: React.FC<Props> = ({ navigation }) => {
  const { selectedDishes } = useDishes();
  const total = useMemo(() => {
    return selectedDishes.reduce((total, dish) => total + dish.price * dish.count, 0);
  }, [selectedDishes]);  
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 20 }}>
      <Text
        style={{
          fontSize: 42,
          color: 'black',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 20,
        }}
      >
         Christoffel 
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Choose your meal
      </Text>

      {/* Starters */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#000000',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('StartersScreen')}
      >
        <Image
          source={require('./assets/starters.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          Starters - Fresh & Light
        </Text>
      </TouchableOpacity>

      {/* Main Course */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#000000',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('MainCourseScreen')}
      >
        <Image
          source={require('./assets/main.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
           Main
        </Text>
      </TouchableOpacity>

      {/* Dessert */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: '#000000',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
        onPress={() => navigation.navigate('DessertScreen')}
      >
        <Image
          source={require('./assets/dessert.jpg')}
          style={{
            width: 60,
            height: 60,
            marginRight: 15,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#FFF',
          }}
        />
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '500', flex: 1 }}>
          Dessert 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDishScreen: React.FC = () => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dishSelectOpen, setDishSelectOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cookingTime, setCookingTime] = useState('');
  const [chefNotes, setChefNotes] = useState('');

  const handleDishSelect = (value: string | null) => {
    const selected = sampleDishes.find((dish) => dish.name === value);
    setSelectedDish(value ?? '');
    setDescription(selected ? selected.description : '');
    setPrice(selected ? `Price: R${selected.price}` : '');
  };

  const handlePhotoUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        ToastAndroid.show('Upload cancelled', ToastAndroid.SHORT);
      } else if (response.errorMessage) {
        ToastAndroid.show('Error uploading', ToastAndroid.SHORT);
      } else if (response.assets && response.assets.length > 0) {
        setUploadedImage(response.assets[0].uri ?? '');
        ToastAndroid.show('Photo uploaded', ToastAndroid.SHORT);
      }
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Christoffel</Text>
      <Text style={{ color: 'white', fontSize: 18, marginTop: 20, textAlign: 'center' }}>
        Create and Customize Your Dish
      </Text>

      <DropDownPicker
  open={open}
  setOpen={setOpen}
  items={[
    { label: '🥗 Starter', value: 'starter' },
    { label: '🍝 Main', value: 'main' },
    { label: '🍰 Dessert', value: 'dessert' },
  ]}
  placeholder="Select Category"
  containerStyle={{ height: 40, marginTop: 20 }}
  style={{ backgroundColor: '#000000' }} // Red background for dropdown
  dropDownContainerStyle={{ backgroundColor: '#000000' }} // Adjusted for dropdown options background
  value={category}
  setValue={setCategory}
/>


<DropDownPicker
  open={dishSelectOpen}
  setOpen={setDishSelectOpen}
  items={sampleDishes
    .filter((dish) => dish.category === category)
    .map((dish) => ({ label: dish.name, value: dish.name }))}
  placeholder="Select Available Dish"
  containerStyle={{ height: 40, marginTop: 20 }}
  style={{ backgroundColor: '#000000' }} // Red background for dropdown
  dropDownContainerStyle={{ backgroundColor: '#000000' }} // Adjusted for dropdown options background
  value={selectedDish}
  setValue={setSelectedDish} // Now directly setting the selected dish value
/>
      {selectedDish && (
        <View style={{ backgroundColor: 'white', padding: 15, marginTop: 20, borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
            {selectedDish}
          </Text>
          <Text style={{ color: 'white', marginTop: 5 }}>{price}</Text>
          <Text style={{ color: 'white', marginTop: 10 }}>{description}</Text>
        </View>
      )}

      {uploadedImage && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source={{ uri: uploadedImage }} style={{ width: 300, height: 200, borderRadius: 15 }} />
        </View>
      )}

      <TouchableOpacity
        onPress={handlePhotoUpload}
        style={{
          marginTop: 20,
          backgroundColor: '#000000', // Red background for upload button
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Upload Dish Photo</Text>
      </TouchableOpacity>

      <TextInput
        style={{
          marginTop: 20,
          backgroundColor: 'white',
          padding: 10,
          height: 50,
          textAlignVertical: 'top',
          borderRadius: 10,
          borderColor: '#000000',
          borderWidth: 1,
        }}
        placeholder="Cooking Time (e.g., 30 mins)"
        value={cookingTime}
        onChangeText={setCookingTime}
      />
      <TextInput
        style={{
          marginTop: 20,
          backgroundColor: 'white',
          padding: 10,
          height: 100,
          textAlignVertical: 'top',
          borderRadius: 10,
          borderColor: '#00000',
          borderWidth: 1,
        }}
        placeholder="Chef's Notes..."
        value={chefNotes}
        onChangeText={setChefNotes}
        multiline
      />
      <TextInput
        style={{
          marginTop: 20,
          backgroundColor: 'white',
          padding: 10,
          height: 100,
          textAlignVertical: 'top',
          borderRadius: 10,
          borderColor: '#00000',
          borderWidth: 1,
        }}
        placeholder="Add or edit dish description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />
    </ScrollView>
  );
};
const MainCourseScreen: React.FC = () => {
  const { dishes, updateDishCount } = useDishes();
  const navigation = useNavigation(); // Assuming you want to add navigation functionality

  // State to track selected main courses and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const updatedState = { ...prevState, [dishId]: (prevState[dishId] || 0) + 1 };
      updateDishCount(Number(dishId), 1);
      return updatedState;
    });
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        const updatedState = { ...prevState, [dishId]: currentQuantity - 1 };
        updateDishCount(Number(dishId), -1);
        return updatedState;
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      updateDishCount(Number(dishId), -prevState[dishId]);
      return newState;
    });
  };

  // Calculate the total price based on selected dishes
  const totalPrice = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#FFFFFF' }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: '#000000',
        }}
      >
         Main Courses
      </Text>
      <FlatList
        data={dishes.filter(dish => dish.category === 'main' && dish.count > 0)} // Filter main dishes
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              padding: 10,
              backgroundColor: '#FFF',
              borderRadius: 10,
              borderColor: '#000000',
              borderWidth: 1,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: 150,
                borderRadius: 10,
              }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Available: {item.count}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Price: ${item.price.toFixed(2)}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#000000',
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>Quantity: {selectedDishes[item.id.toString()] || 0}</Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#000000',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PaymentScreen')} // Navigate to PaymentScreen
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: '#000000',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DessertScreen: React.FC = () => {
  const { dishes } = useDishes(); // Get dishes data
  const navigation = useNavigation(); // Use the navigation hook

  // State to track the selected desserts and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => ({
      ...prevState,
      [dishId]: (prevState[dishId] || 0) + 1,
    }));
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        return {
          ...prevState,
          [dishId]: currentQuantity - 1,
        };
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      return newState;
    });
  };

  const totalPrice = calculateTotal();

  const handleNavigateToPayment = () => {
    navigation.navigate('PaymentScreen', { totalPrice }); 
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#F5EFEF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'black' }}>
        🍰 Desserts
      </Text>
      <FlatList
        data={dishes.filter((dish) => dish.category === 'dessert' && dish.count > 0)} // Filter dishes by category and ensure count > 0
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 20,
              borderColor: '#FF3131',
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              backgroundColor: '#FFF',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 150, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Available: {item.count}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Price: R{item.price}</Text>

            {/* Quantity controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#000000',
                  padding: 10,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Quantity: {selectedDishes[item.id.toString()] || 0}
              </Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{
                  backgroundColor: '#FF3131',
                  padding: 10,
                  borderRadius: 10,
                  marginLeft: 10,
                }}
              >
                <Text style={{ color: 'black', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            {/* Remove button */}
            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: '#000000',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Total Price */}
      <View
        style={{
          backgroundColor: '#000000',
          padding: 15,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 5,
          marginTop: 'auto', // Push it to the bottom of the screen
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
          Total: R{totalPrice.toFixed(2)}
        </Text>
      </View>

      {/* Total Button */}
      <TouchableOpacity
        onPress={handleNavigateToPayment}
        style={{
          backgroundColor: '#000000',
          paddingVertical: 15,
          marginTop: 20,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Go to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

type StartersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartersScreen'>;

interface StartersScreenProps {
  navigation: StartersScreenNavigationProp;
}
const StartersScreen: React.FC<StartersScreenProps> = () => {
  const { dishes, updateDishCount } = useDishes();
  const navigation = useNavigation<StartersScreenNavigationProp>(); // Initialize the navigation hook with the type

  // State to track the selected starters and their quantities
  const [selectedDishes, setSelectedDishes] = useState<{ [key: string]: number }>({});

  // Function to calculate the total price
  const calculateTotal = () => {
    return Object.keys(selectedDishes).reduce((total, dishId) => {
      const dish = dishes.find((dish) => dish.id.toString() === dishId);
      if (dish) {
        return total + dish.price * selectedDishes[dishId];
      }
      return total;
    }, 0);
  };

  // Function to increase the quantity of a dish
  const increaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const updatedState = { ...prevState, [dishId]: (prevState[dishId] || 0) + 1 };
      updateDishCount(Number(dishId), 1);
      return updatedState;
    });
  };

  // Function to decrease the quantity of a dish
  const decreaseQuantity = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const currentQuantity = prevState[dishId] || 0;
      if (currentQuantity > 0) {
        const updatedState = { ...prevState, [dishId]: currentQuantity - 1 };
        updateDishCount(Number(dishId), -1);
        return updatedState;
      }
      return prevState;
    });
  };

  // Function to remove a dish from the selected list
  const removeDish = (dishId: string) => {
    setSelectedDishes((prevState) => {
      const newState = { ...prevState };
      delete newState[dishId];
      updateDishCount(Number(dishId), -prevState[dishId]);
      return newState;
    });
  };

  // Calculate the total price based on selected dishes
  const totalPrice = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#FFFFFF' }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
          color: 'black',
        }}
      >
         Starters - Fresh & Light
      </Text>
      <FlatList
        data={dishes.filter((dish) => dish.category === 'starter' && dish.count > 0)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, padding: 10, backgroundColor: '#FFF', borderRadius: 10, borderColor: '#000000', borderWidth: 1 }}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 150, borderRadius: 10 }} />
            <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>{item.name}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Available: {item.count}</Text>
            <Text style={{ fontSize: 16, marginTop: 5, color: 'black' }}>Price: R{item.price}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => increaseQuantity(item.id.toString())}
                style={{ backgroundColor: '#FF3131', padding: 10, borderRadius: 10, marginRight: 10 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, color: 'black' }}>Quantity: {selectedDishes[item.id.toString()] || 0}</Text>
              <TouchableOpacity
                onPress={() => decreaseQuantity(item.id.toString())}
                style={{ backgroundColor: ' #000000', padding: 10, borderRadius: 10, marginLeft: 10 }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => removeDish(item.id.toString())}
              style={{
                marginTop: 15,
                backgroundColor: ' #000000',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const PaymentScreen: React.FC = () => {
  // Declare state variables before the return statement
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#000000', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Payment</Text>
      
      <TextInput
        placeholder="Card Number"
        placeholderTextColor="white"
        onChangeText={setCardNumber}
        keyboardType="numeric"
        style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 20, color: 'white' }}
      />
      
      <TextInput
        placeholder="Expiry Date (MM/YY)"
        placeholderTextColor="white"
        onChangeText={setExpiryDate}
        style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 20, color: 'white' }}
      />
      
      <TextInput
        placeholder="CVV"
        placeholderTextColor="white"
        onChangeText={setCvv}
        keyboardType="numeric"
        style={{ borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 20, color: 'white' }}
      />
      
      <TouchableOpacity 
        onPress={() => ToastAndroid.show('Payment Processed!', ToastAndroid.SHORT)} 
        style={{ marginTop: 20, backgroundColor: '#FFFFFF', padding: 10 }}
      >
        <Text style={{ color: 'black', textAlign: 'center' }}>Submit Payment</Text>
      </TouchableOpacity>
    </View>
  );
};
export type RootStackParamList = {
  Splash: undefined;
  Choice: undefined;
  Main: undefined;
  Filter: undefined;
  CustomDish: undefined;
  PaymentScreen: undefined;
  AddToFilterScreen: undefined;
  StartersScreen: undefined;
  MainCourseScreen: undefined;
  DessertScreen: undefined;
};


export default App;
