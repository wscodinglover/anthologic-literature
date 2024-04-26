import { View } from "@tarojs/components";
import { AtTextarea, AtButton } from "taro-ui";
import { useState } from "react";
import { traditionalized, simplized, copy } from "../../utils";
import "./index.less";

export default function Hanzi() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [type, setType] = useState(1);
  const handleChange = (text) => {
    setInputText(text);
  };

  const handleTranlate = () => {
    setResultText(() => {
      const fn = type === 1 ? traditionalized : simplized;
      return fn(inputText);
    });
  };

  const onCopy = () => {
    copy(resultText);
  };

  const toggleBtn = () => {
    setType(type === 0 ? 1 : 0);
  };

  return (
    <View style={{ padding: 15 }}>
      <View className="btn-group" onClick={toggleBtn}>
        <View
          className="btn-group__left"
          style={{ backgroundColor: type ? "#fff" : "#6190e8" }}
        >
          简体
        </View>
        <View
          className="btn-group__right"
          style={{ backgroundColor: !type ? "#fff" : "#6190e8" }}
        >
          繁体
        </View>
      </View>
      <AtTextarea
        value={inputText}
        onChange={handleChange}
        maxLength={500}
        placeholder="输入文字..."
        height={500}
      />
      <View
        style={{
          marginTop: 5,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 5,
        }}
      >
        <AtButton type="primary" size="small" onClick={handleTranlate}>
          {type === 1 ? "简体转繁体" : "繁体转简体"}
        </AtButton>
        <AtButton type="secondary" size="small" onClick={onCopy}>
          复制内容
        </AtButton>
        <AtButton
          type="secondary"
          size="small"
          onClick={() => {
            setInputText("");
            setResultText("");
          }}
        >
          清空输入
        </AtButton>
      </View>
      <View
        style={{
          marginTop: 5,
          border: "1px #d6e4ef solid",
          padding: 5,
          borderRadius: 5,
          minHeight: 100,
          maxHeight: 500,
          overflowY: "auto",
          fontSize: 16,
        }}
      >
        {resultText}
      </View>
    </View>
  );
}
