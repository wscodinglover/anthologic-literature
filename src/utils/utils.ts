import Taro from "@tarojs/taro";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getStorage = (key: string) => Taro.getStorageSync(key);

export const setStorage = (key: string, value: any) =>
  Taro.setStorageSync(key, value);

export const navigateTo = (config) => Taro.navigateTo(config);

export const navigateBack = () => Taro.navigateBack();

export const isFunction = (value) => typeof value === "function";

export const copy = (data) =>
  Taro.setClipboardData({
    data: data,
    success: function (res) {
      Taro.getClipboardData({
        success: function (res) {
          console.log(res.data); // data
        },
      });
    },
  });

export const setTitle = (title) => Taro.setNavigationBarTitle({ title });
