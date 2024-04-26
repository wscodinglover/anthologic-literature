import { View } from "@tarojs/components";
import Loading from "../../components/Loading";
import { weeksStr } from "./constants";
import "./index.less";
import { initial, tick } from "./utils";
import { useEffect, useState } from "react";
import { DayProp, DaysProp } from "./utils";

export default function Laohuangli() {
  const [loading, setLoading] = useState(false);
  const [GZ, setGZ] = useState("");
  const [days, setDays] = useState<DaysProp>([]);
  const [day, setDay] = useState<DayProp>({
    time: "",
    color: "",
    text: "",
  });

  const init = () => {
    const initData = initial();
    setGZ(initData.result.GZ);
    setDays(initData.result.days);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    init();
    let timer = setInterval(() => {
      const day = tick();
      setDay(day);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <View>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="at-article__h2">{GZ}</View>
          <View className="at-article__p" style={{ paddingBottom: 20 }}>
            现在时间：{day.text}（{day.time}时）
          </View>
          <View className="weeks at-article__content">
            {weeksStr.map((week, idx) => (
              <View
                key={idx}
                style={{
                  color: idx % 6 === 0 ? "red" : "#000",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                {week}
              </View>
            ))}
            {days.map((day, idx) => (
              <View
                key={idx}
                style={{
                  color: idx % 7 === 0 || idx % 7 === 6 ? "red" : "#000",
                  fontSize: 20,
                }}
              >
                <View
                  style={{
                    fontSize: 16,
                    color: day.sObj.color || "inherit",
                  }}
                >
                  {day.sObj.text}
                </View>
                <View
                  style={{
                    fontSize: 16,
                    color: day.lObj.color || "#666",
                  }}
                >
                  {day.lObj.text}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
