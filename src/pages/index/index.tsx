import { View } from "@tarojs/components";
import Card from "../../components/Card";
import List from "../../components/List";

export default function BooksPage() {
  return (
    <View style={{ paddingTop: 15 }}>
      <Card title="易学书籍">
        <List
          column={4}
          gap={10}
          list={[
            {
              title: "系辞",
              url: "/sub-pages/xici/index",
              icon: "books1",
            },
            {
              title: "易经注释",
              url: "/sub-pages/yijing/index",
              icon: "books2",
            },
          ]}
        />
      </Card>
    </View>
  );
}
