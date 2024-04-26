import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { AtTabs, AtTabsPane, AtDivider } from "taro-ui";
import "./index.less";
import Card from "../Card";

export default function TabsDefinity({ data }) {
  const [current, setCurrent] = useState(0);
  const [tabsList, setTabsList] = useState([]);
  const [contents, setContents] = useState([[]]);

  useEffect(() => {
    const tabsListTemp = data.map((item) => ({ title: item.title }));
    const contentsTemp = data.map((item) => item.content);

    setTabsList(tabsListTemp);
    setContents(contentsTemp);
  }, []);

  const renderItem = (item) => {
    if (!item) return <br />;
    if (/^#icon/.test(item)) {
      const words = item.substr(5).split("");
      return (
        <View className="at-row at-article__h2">
          {words.map((word, idx) => {
            if (idx > 0 && ["(", "（"].includes(words[idx - 1])) {
              return (
                <View className="yijing" key={word}>
                  {word}
                </View>
              );
            }
            return word;
          })}
        </View>
      );
    }
    if (/^#color/.test(item)) {
      const strArr = item.replace(/#color/g, "").split("");
      let startIdx = 0,
        endIdx = 0;
      strArr.forEach((w, i) => {
        if (w === "[") {
          startIdx = i + 1;
        }
        if (w === "]") {
          endIdx = i;
        }
      });
      const color = strArr.slice(startIdx, endIdx).join("");
      const text = strArr.slice(endIdx + 1).join("");

      return <View className={`at-acticle__h3 ${color}-text`}>{text}</View>;
    }
    if (/^#divider/.test(item)) {
      return (
        <AtDivider
          content={item.replace(/#divider/g, "")}
          className="at-article__h2"
          style={{ marginLeft: 0 }}
        />
      );
    }
    return <View className="text-indent">{item}</View>;
  };

  return (
    <AtTabs
      scroll
      current={current}
      tabList={tabsList}
      onClick={(value) => setCurrent(value)}
    >
      {tabsList.map((_, idx) => (
        <AtTabsPane current={current} index={idx} key={`definity_tabs_${idx}`}>
          <Card className="at-article__content" style={{ marginTop: 15 }}>
            {contents[current].map((item, idx) => (
              <View
                className="at-article__p"
                key={`definity_tab_${idx}_${current}`}
              >
                {renderItem(item)}
              </View>
            ))}
          </Card>
        </AtTabsPane>
      ))}
    </AtTabs>
  );
}
