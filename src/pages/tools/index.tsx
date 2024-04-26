import { View } from "@tarojs/components";
import Card from "../../components/Card";
import List from "../../components/List";

export default function BooksPage() {
  return (
    <View style={{ paddingTop: 15 }}>
      <Card title="基本工具">
        <List
          column={4}
          gap={10}
          list={[
            {
              title: "汉字简繁",
              url: "/sub-pages/hanzi/index",
              icon: "tools0",
            },
            {
              title: "老黄历",
              url: "/sub-pages/laohuangli/index",
              icon: "tools1",
            },
          ]}
        />
      </Card>
    </View>
  );
}
