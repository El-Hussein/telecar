import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { GiveRate } from "../../../Redux/actions/Customer";
import AntDesign from "react-native-vector-icons/AntDesign";

const ReviewScreen = props => {
  const [indexSelected, SetindexSelected] = useState(-1);
  const [loading, SetLoading] = useState(false);
  React.useEffect(() => {
    console.log("===============params=====================");
    console.log(props.navigation.state.params);
    console.log("================params====================");
  }, []);

  return (
    <View>
      <Text>Review</Text>
      {[1, 2, 3, 4, 5].map((t, i) => {
        return (
          <TouchableOpacity key={i} onPress={() => SetindexSelected(i)}>
            <AntDesign
              name="star"
              size={20}
              color={indexSelected >= i ? "#57B235" : "gray"}
            />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={{
          backgroundColor: "#57B235",
          width: "90%",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          height: 40,
          borderRadius: 14
        }}
        onPress={async () => {
          if (indexSelected === -1) {
            return;
          } else {
            SetLoading(true);
            props.giveRateNow();
          }
        }}
      >
        {this.state.loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={{ color: "white" }}>review provider</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    giveRateNow: (rate, offer_id) => GiveRate(dispatch, rate, offer_id)
  };
};

export default connect(
  mapState,
  mapDispatch
)(ReviewScreen);
