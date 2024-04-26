import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { yijingData } from "./datas";
import { AtCard } from "taro-ui";
import "./index.less";
import Loading from "../../components/Loading";
import TabsDefinity from "../../components/Tabdefinity/tabsDefinity";
import { unzip, setTitle } from "../../utils";

interface DetailData {
  title: string;
  content: string[];
  multipleVersion?: boolean;
  definition?: { title: string; content: string[] }[];
}

export default function DetailPage() {
  const [detailData, setDetailData] = useState<DetailData>({
    title: "",
    content: [],
  });

  const getDetail = () => {
    const { router } = Taro.getCurrentInstance();
    const { id } = router?.params || {};
    const result = unzip(yijingData)[id || 0];
    setTitle(result.title);
    setDetailData(() => result);
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <View className="at-article p-30">
      <View className="at-article__section">
        {detailData?.multipleVersion ? (
          <TabsDefinity
            data={[
              { title: detailData.title, content: detailData.content },
              ...(detailData?.definition || []),
            ]}
          />
        ) : (
          <Loading />
        )}
      </View>
    </View>
  );
}
