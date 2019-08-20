"use strict";

import React, { Component } from "react";

import { StyleSheet, View, Text } from "react-native";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroAmbientLight,
  Viro3DObject,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroSpotLight,
  ViroImage,
  ViroScene,
  ViroPortalScene,
  ViroPortal,
  ViroNode,
  ViroARCamera
} from "react-viro";

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      initialized: false,
      score: 0,
      coinCount: 7,
      coins: []
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    // // this.renderCoins();
    // this.setState(state => {
    //   let newCoins = [];
    //   for (let i = 0; i < state.coinCount; i++) {
    //     newCoins = [
    //       {
    //         x: this.getRandomNumbers(),
    //         y: this.getRandomNumbers()
    //       }
    //     ];
    //   }
    //   return {
    //     coins: newCoins
    //   };
    // });
    let newCoins = [];
    for (let i = 0; i < this.state.coinCount; i++) {
      newCoins.push({
        x: this.getRandomNumbers(),
        y: 0
      });
    }
    this.setState({ coins: newCoins });
  }

  getRandomNumbers = () => {
    return Math.floor(Math.random() * 6) - 3;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ViroARScene>
          <ViroARCamera>
            <ViroText
              position={[2, 2.5, -6]}
              text={`Score: ${this.state.score}`}
              width={2}
              height={2}
            />
          </ViroARCamera>
          {/* <View>
          <Text>Hello </Text>
        </View> */}
          {/* <ViroARCamera>
        
        </ViroARCamera> */}
          <ViroNode position={[0.0, 0.0, -1.0]} scale={[0.5, 0.5, 0.5]}>
            <ViroAmbientLight color='#ffffff' />

            <ViroImage
              height={1}
              width={1}
              source={require("../assets/tree-min.png")}
              position={[0, 0, 0]}
              transformBehaviors={["billboard"]}
            />
          </ViroNode>

          {this.state.coins.map(({ x, y }) => (
            <ViroNode key={x} position={[x, y, -1]} scale={[0.5, 0.5, 0.5]}>
              <Viro3DObject
                source={require("../assets/res/res/emoji_smile/emoji_smile.vrx")}
                resources={[
                  require("../assets/res/res/emoji_smile/emoji_smile_specular.png")
                ]}
                type='VRX'
                position={[1, 1, -1]}
                scale={[0.25, 0.25, 0.25]}
              />
            </ViroNode>
          ))}
        </ViroARScene>
      </View>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        initialized: true
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle Looss of Tracking
      this.setState({
        initialized: false
      });
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldSceneAR;
