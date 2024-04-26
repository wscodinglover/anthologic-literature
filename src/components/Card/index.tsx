import { View, Text } from "@tarojs/components";

import "./index.less";
import { ReactElement } from "react";

interface CardProps {
  title?: string;
  extra?: string;
  author?: string;
  tips?: string;
  children: ReactElement | ReactElement[];
  className?: string;
  style?: React.CSSProperties;
}

export default function Card(props: CardProps) {
  return (
    <View className={`card-container ${props.className}`} style={props.style}>
      {props.title && (
        <View className="card-container__header">
          <Text className="card-container__header-title">{props.title}</Text>
          <Text className="at-article__info">{props.author}</Text>
        </View>
      )}
      <View className="at-article__p">{props.children}</View>
      <View className="at-article__info card-container__footer">
        {props.tips}
      </View>
    </View>
  );
}
