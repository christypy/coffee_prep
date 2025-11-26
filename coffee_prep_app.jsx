import React, { useState } from "react";

function all() {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

function countSummary(list) {
  let summary = { "熱美式": 0, "冰美式": 0, "熱拿鐵": 0, "大熱拿": 0, "手沖": 0 };
  list.forEach((i) => {
    const d = i.drink;
    if (d.includes("熱美式")) summary["熱美式"]++;
    if (d.includes("冰美式")) summary["冰美式"]++;
    if (d.includes("熱拿鐵") && !d.includes("大拿")) summary["熱拿鐵"]++;
    if (d.includes("大拿")) {
      const match = d.match(/×(\d+)/);
      if (match) summary["大熱拿"] += parseInt(match[1]);
      else summary["大熱拿"]++;
    }
    if (d.includes("手沖")) summary["手沖"]++;
  });
  return summary;
}

export default function CoffeePrepApp() {
  const [day, setDay] = useState(new Date().toLocaleDateString("en-US", { weekday: "short" }));

  const allItems = [
    { area: "鄰居區", name: "怡香軒", drink: "熱美式", days: all() },
    { area: "鄰居區", name: "油飯", drink: "熱美式(詢問)", days: all() },
    { area: "鄰居區", name: "山城米食", drink: "拿鐵(寄杯)", days: all() },
    { area: "鄰居區", name: "橘子攤", drink: "拿鐵", days: all() },
    { area: "鄰居區", name: "糖果", drink: "熱拿鐵", days: ["Sat", "Sun"] },

    { area: "鄰居區", name: "布老闆", drink: "熱美式(寄杯)", days: ["Fri"] },
    { area: "鄰居區", name: "牛肉", drink: "熱拿鐵+3g糖", days: ["Wed", "Fri", "Sun"] },
    { area: "鄰居區", name: "甘蔗雞", drink: "冰美式", days: all() },
    { area: "鄰居區", name: "國聯哥", drink: "冰美式", days: all() },

    { area: "其他區", name: "牛肉爸爸&兒子", drink: "大拿鐵×2", days: all() },
    { area: "其他區", name: "魚老闆", drink: "大拿鐵(寄杯)", days: ["Tue", "Wed", "Fri"] },
    { area: "其他區", name: "水果鄰居", drink: "拿鐵", days: ["Tue", "Wed", "Sat", "Sun"] },
    { area: "其他區", name: "小辣椒", drink: "熱美式", days: all() },
    { area: "其他區", name: "蝦老闆", drink: "熱美式", days: ["Tue", "Thu", "Fri", "Sat"] },
    { area: "其他區", name: "貢丸老闆", drink: "熱拿鐵+手沖", days: ["Wed"] },
    { area: "其他區", name: "豐原素食", drink: "熱美式", days: ["Wed"] },
    { area: "其他區", name: "菜老闆", drink: "熱拿鐵", days: all() },
    { area: "其他區", name: "中山路水果", drink: "熱美式", days: all() },
    { area: "其他區", name: "福記豬肉", drink: "熱美式(寄杯)", days: all() },
  ];

  const todayList = allItems.filter((i) => i.days.includes(day));

  const neighborArea = todayList.filter((i) => i.area === "鄰居區");
  const otherArea = todayList.filter((i) => i.area === "其他區");

  const statsNeighbor = countSummary(neighborArea);
  const statsOther = countSummary(otherArea);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 font-sans bg-gradient-to-b from-yellow-50 to-yellow-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-yellow-800 mb-4 drop-shadow-md">咖啡準備系統 ☕</h1>

      <select
        className="p-3 rounded-lg border border-yellow-400 shadow-lg w-full max-w-sm mx-auto block mb-6 bg-white"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        {all().map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <StatsBlock title="鄰居區統計" stats={statsNeighbor} />
          <Section title="鄰居區" items={neighborArea} />
        </div>
        <div className="flex-1">
          <StatsBlock title="其他區統計" stats={statsOther} />
          <Section title="其他區" items={otherArea} />
        </div>
      </div>
    </div>
  );
}

function StatsBlock({ title, stats }) {
  return (
    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl shadow-md space-y-2 mb-4">
      <h2 className="text-xl font-bold text-yellow-700">{title}</h2>
      <div className="grid grid-cols-2 gap-2 text-yellow-800 font-semibold">
        <p>熱美式: {stats["熱美式"]}</p>
        <p>冰美式: {stats["冰美式"]}</p>
        <p>熱拿鐵: {stats["熱拿鐵"]}</p>
        <p>大熱拿: {stats["大熱拿"]}</p>
        <p>手沖: {stats["手沖"]}</p>
      </div>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 text-yellow-800 drop-shadow-sm">{title}</h2>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-lg hover:shadow-yellow-200 transition-shadow duration-200"
          >
            <input type="checkbox" className="w-6 h-6 accent-yellow-500" />
            <div>
              <p className="font-semibold text-yellow-900">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.drink}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
