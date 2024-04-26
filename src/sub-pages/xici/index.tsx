import { View, Image } from "@tarojs/components";
import { AtCard } from "taro-ui";
import { xici1, xici2, wenyan1, wenyan2, shuogua, xugua, zagua } from "./data";
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
          title="《系辞·上》"
          className="at-article__section yijing-list__item"
        >
          {xici1.map((item, idx) => (
            <View className="at-article__p text-indent" key={`yijing1_${idx}`}>
              {item}
            </View>
          ))}
        </AtCard>

        <AtCard
          title="《系辞·下》"
          className="at-article__section yijing-list__item"
        >
          {xici2.map((item, idx) => (
            <View className="at-article__p text-indent" key={`yijing1_${idx}`}>
              {item}
            </View>
          ))}
        </AtCard>

        <AtCard
          title="《文言传》"
          className="at-article__section yijing-list__item"
        >
          <View className="at-article__section">
            <View className="at-article__h3">乾文言</View>
            {wenyan1.map((item, idx) => (
              <View
                className="at-article__p text-indent"
                key={`yijing1_${idx}`}
              >
                {item}
              </View>
            ))}
          </View>
          <View className="at-article__section">
            <View className="at-article__h3 margin-top-20">坤文言</View>
            {wenyan2.map((item, idx) => (
              <View
                className="at-article__p text-indent"
                key={`yijing1_${idx}`}
              >
                {item}
              </View>
            ))}
          </View>
        </AtCard>

        <AtCard
          title="《说卦传》"
          className="at-article__section yijing-list__item"
        >
          {shuogua.map((item, idx) => (
            <View className="at-article__p text-indent" key={`yijing1_${idx}`}>
              {item}
            </View>
          ))}
        </AtCard>

        <AtCard
          title="《序卦传》"
          className="at-article__section yijing-list__item"
        >
          {xugua.map((item, idx) => (
            <View className="at-article__p text-indent" key={`yijing1_${idx}`}>
              {item}
            </View>
          ))}
        </AtCard>

        <AtCard
          title="《杂卦传》"
          className="at-article__section yijing-list__item"
        >
          {zagua.map((item, idx) => (
            <View className="at-article__p text-indent" key={`yijing1_${idx}`}>
              {item}
            </View>
          ))}
        </AtCard>
      </View>
    </View>
  );
}
