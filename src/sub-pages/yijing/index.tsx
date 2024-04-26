import { View, Image } from "@tarojs/components";
import { AtCard } from "taro-ui";
import { introduction, yijing1, yijing2 } from "./data";
import "./index.less";

import { navigateTo } from "../../utils";

/**
 * 自动引入当前文件夹下所有module
 * require.context(directory, useSubdirectories = false, regExp = /^.//);
 */
const modulesFiles = require.context(
  "../../assets/images/big64",
  false,
  /.jpg$/
);
const images = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.jpg/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value;
  return modules;
}, {});

export default function YiJingPage() {
  const jumpToPage = (item, id) => {
    console.log("jumpToPage", item);
    // 跳转页面
    navigateTo({
      url: `${item}/index?id=${id}`,
    });
  };

  return (
    <View className="at-article">
      <View className="at-article__h1" style={{ marginBottom: 20 }}>
        易经全文
      </View>
      <View className="at-article__content">
        <AtCard
          title="《易经》简介"
          className="at-article__section yijing-list__item"
        >
          {introduction.map((item, idx) => (
            <View className="at-article__p text-indent" key={`yijing1_${idx}`}>
              {item}
            </View>
          ))}
        </AtCard>

        <AtCard
          title="易经上经"
          className="at-article__section yijing-list__item"
        >
          <View className="yijing-card">
            {yijing1.map((item, idx) => (
              <View
                className="yijing-card__item link-text"
                key={`introduct_${idx}`}
                onClick={() => jumpToPage("/sub-pages/yijingup", idx)}
              >
                <View> {item}</View>
                <Image
                  src={images[idx + 1]}
                  style={{ width: 30, height: 40 }}
                ></Image>
              </View>
            ))}
          </View>
        </AtCard>

        <AtCard
          title="易经下经"
          className="at-article__section yijing-list__item"
        >
          <View className="yijing-card">
            {yijing2.map((item, idx) => (
              <View
                className="yijing-card__item link-text"
                key={`yijing2_${idx}`}
                onClick={() => jumpToPage("/sub-pages/yijingdown", idx)}
              >
                <View> {item}</View>
                <Image
                  src={images[idx + 31]}
                  style={{ width: 30, height: 40 }}
                ></Image>
              </View>
            ))}
          </View>
        </AtCard>
      </View>
    </View>
  );
}
