import { View, Image } from "@tarojs/components";
import "./index.less";
import { navigateTo } from "../../utils";
import { iconsMaps } from "./constant";

export default function List(props) {
  const onHandle = (item) => {
    navigateTo({ url: item.url });
  };

  return (
    <View
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.column || 3}, 1fr)`,
        gap: props.gap || 20,
      }}
    >
      {props.list.map((item, idx) =>
        props.renderItem ? (
          props.renderItem(item, idx)
        ) : (
          <View
            className="list-container__title"
            key={idx}
            onClick={item.onClick ? item.onClick : () => onHandle(item)}
          >
            <Image
              src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                item.icon && iconsMaps[item.icon]
              )}`}
              style={{ width: 30, height: 30 }}
            ></Image>
            <View>{item.title}</View>
          </View>
        )
      )}
    </View>
  );
}
