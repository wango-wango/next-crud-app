// pages/index.tsx
"use client";
import React, { useMemo, useState } from "react";
import Circle from "./circle";

const Home: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [circles, setCircles] = useState<
    { name: string; x: number; y: number }[]
  >([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const memorizedCircles = useMemo(() => circles, [circles]);

  const handleAddCircle = () => {
    const newCircle = {
      name,
      x: 0, // 0 到 window.innerWidth 之间的随机 x 坐标
      y: 0, // 0 到 window.innerHeight 之间的随机 y 坐标
    };
    setCircles((prevCircles) => [...prevCircles, newCircle]);
    setName("");
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="relative overflow-hidden bg-gray-200 w-full h-full">
        <div className="flex justify-center items-center">
          <input
            type="text"
            value={name}
            onChange={handleInputChange}
            placeholder="Enter name"
            className="m-2 p-2 border border-gray-400 rounded text-slate-800"
          />
          <button
            onClick={handleAddCircle}
            className="m-2 p-2 bg-blue-500 text-white rounded"
          >
            Add Circle
          </button>
        </div>
        <div className="absolute top-[calc(100% + 10px)] left-0 w-full h-full">
          {memorizedCircles.map((circle, index) => (
            <Circle
              key={circle.name + index}
              name={circle.name}
              x={circle.x}
              y={circle.y}
              diameter={100} // 设置圆圈直径为 100px
              maxX={window.innerWidth - 100} // 圆圈移动范围的最大 x 坐标
              maxY={window.innerHeight - 238} // 圆圈移动范围的最大 y 坐标
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
