import React, { Fragment } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import {
  width,
  height,
  moderateScale,
  scale,
  verticalScale,
  colors
} from "@config";
import Header from "@components/Header2";
import { Images } from "@assets";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import SearchInput, { createFilter } from "react-native-search-filter";
import { GetProductsByView } from "../../../Redux/actions/Customer";

const Search = props => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [data, setData] = React.useState([]);
  const [firstload, setFirstload] = React.useState(true);
  const filteredProducts = data.filter(
    createFilter(searchTerm, ["name", "details"])
  );
  if (firstload) {
    setFirstload(false);
    GetProductsByView().then(res => {
      setData(res);
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={props.navigation} hidelogo={true} />
      <SearchInput
        onChangeText={term => {
          setSearchTerm(term);
        }}
        style={styles.searchInput}
        placeholder="Type a Product to search"
      />
      <ScrollView style={{ flex: 1 }}>
        {filteredProducts.map(item => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Product", { item })}
              key={item.id}
              style={styles.emailItem}
            >
              <View>
                <Text numberOfLines={1}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.emailSubject}>
                  {item.details}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default connect(state => {
  return {
    cats: state.Config.categories
  };
})(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
    padding: 10
  },
  emailSubject: {
    color: "rgba(0,0,0,0.5)"
  },
  searchInput: {
    padding: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    fontSize: RFValue(18)
  }
});
