import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import Carousel from "react-native-snap-carousel";
import { MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const Users = [
    {
      key: "1",
      userImage:
        "https://images.pexels.com/photos/950243/pexels-photo-950243.jpeg?cs=srgb&dl=grayscale-photo-of-braided-hair-woman-950243.jpg&fm=jpg",
      userName: "Melinda",
      transactionDate: "25 April 20",
      amount: "$350",
      credit: true,
    },
    {
      key: "2",
      userImage:
        "https://images.pexels.com/photos/2804282/pexels-photo-2804282.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      userName: "Shawna",
      transactionDate: "29 April 20",
      amount: "$546",
      credit: false,
    },
    {
      key: "3",
      userImage:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      userName: "John",
      transactionDate: "12 May 20",
      amount: "$32",
      credit: true,
    },
    {
      key: "4",
      userImage:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      userName: "Mark",
      transactionDate: "23 May 20",
      amount: "$64",
      credit: true,
    },
    {
      key: "5",
      userImage:
        "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      userName: "Anna",
      transactionDate: "3 June 20",
      amount: "$93",
      credit: false,
    },
    {
      key: "6",
      userImage:
        "https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      userName: "Jason",
      transactionDate: "5 June 20",
      amount: "$48",
      credit: true,
    },
  ];

  const Images = [
    {
      image: require("./assets/card1.png"),
    },
    {
      image: require("./assets/card2.png"),
    },
    {
      image: require("./assets/card3.png"),
    },
    {
      image: require("./assets/card4.png"),
    },
    {
      image: require("./assets/card5.png"),
    },
    {
      image: require("./assets/card6.png"),
    },
  ];

  const { width, height } = Dimensions.get("window");
  const carouselRef = useRef(null);

  const RenderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback>
        <Image
          source={item.image}
          style={{ height: 240, width: 360, borderRadius: 10 }}
        />
      </TouchableWithoutFeedback>
    );
  };

  const [dragRange, setDragRange] = useState({
    top: height - 80,
    bottom: 160,
  });

  const _draggedValue = new Animated.Value(180);

  const ModalRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 50, paddingHorizontal: 14 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 26, color: "#fff" }}>Welcome Back,</Text>
            <Text style={{ fontSize: 26, color: "#fff", opacity: 0.6 }}>
              Saswata Mukherjee
            </Text>
          </View>
          <View>
            <Image
              source={{
                uri:
                  "https://images.pexels.com/photos/936229/pexels-photo-936229.jpeg?auto=compress&cs=tinysrgb&h750&w=1260",
              }}
              style={styles.ProfileImage}
            />
            <View style={styles.ProfileImageNotification}></View>
          </View>
        </View>

        <View>
          <Carousel
            layout={"tinder"}
            ref={carouselRef}
            renderItem={RenderItem}
            data={Images}
            sliderWidth={width}
            itemWidth={width - 10}
            swipeThreshold={100}
            layoutCardOffset={-12}
            inactiveSlideOpacity={0.4}
            containerCustomStyle={{
              overflow: "visible",
              marginVertical: 30,
            }}
            contentContainerCustomStyle={{
              paddingTop: 14,
            }}
          />
        </View>

        <View>
          <Text style={{ color: "#fff", opacity: 0.6, marginBottom: 10 }}>
            Send Money
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.AddUser}>
              <View style={styles.AddUserIconBg}>
                <MaterialIcons
                  name="add"
                  color="white"
                  size={28}
                  style={{ alignSelf: "center" }}
                />
              </View>
              <Text style={{ color: "#fff" }}>Add Users</Text>
            </TouchableOpacity>
            <FlatList
              inverted
              horizontal
              data={Users}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => {
                return (
                  <View style={styles.AddUser}>
                    <Image
                      style={styles.AddUserIconBg}
                      source={{ uri: item.userImage }}
                    />
                    <Text style={{ color: "#fff" }}>{item.userName}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <SlidingUpPanel
          ref={ModalRef}
          draggableRange={dragRange}
          animatedValue={_draggedValue}
          backdropOpacity={0}
          snappingPoints={[360]}
          height={height + 20}
          friction={0.9}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#0c0c0c",
              borderRadius: 24,
              padding: 14,
            }}
          >
            <View style={styles.PanelHandle}></View>
            <View>
              <Text style={{ color: "#fff", marginVertical: 16 }}>
                Recent Transactions
              </Text>
            </View>
            <View style={{ paddingBottom: 10, height: 500 }}>
              <FlatList
                data={Users}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.PanelItemContainer}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={{ marginRight: 10 }}>
                          <Image
                            source={{ uri: item.userImage }}
                            style={styles.PanelImage}
                          />
                        </View>
                        <View>
                          <Text style={{ fontSize: 14, color: "#fff" }}>
                            {item.userName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#fff",
                              opacity: 0.6,
                            }}
                          >
                            {item.transactionDate}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#fff",
                            marginHorizontal: 2,
                          }}
                        >
                          {item.amount}
                        </Text>
                        {item.credit ? (
                          <MaterialIcons
                            name="arrow-drop-up"
                            color="green"
                            size={22}
                          />
                        ) : (
                          <MaterialIcons
                            name="arrow-drop-down"
                            color="#ff3838"
                            size={22}
                          />
                        )}
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity style={styles.PanelButton}>
                <Text style={styles.PanelButtonText}>View Full History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 0,
  },
  ProfileImage: {
    width: 55,
    height: 55,
    borderRadius: 40,
  },
  ProfileImageNotification: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "#4853ef",
    right: 0,
    position: "absolute",
    borderWidth: 2,
    borderColor: "#000",
  },
  AddUser: {
    height: 140,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0c0c",
    borderRadius: 10,
    marginRight: 14,
  },
  AddUserIconBg: {
    width: 70,
    height: 70,
    backgroundColor: "#000",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  PanelHandle: {
    height: 5,
    width: 75,
    borderRadius: 6,
    backgroundColor: "#666",
    alignSelf: "center",
    marginTop: 0,
  },
  PanelItemContainer: {
    borderWidth: 0.4,
    borderColor: "#666",
    padding: 14,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  PanelImage: {
    width: 30,
    height: 30,
    backgroundColor: "#000",
    borderRadius: 40,
  },
  PanelButton: {
    padding: 14,
    width: 200,
    justifyContent: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
  },
  PanelButtonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
  },
});
