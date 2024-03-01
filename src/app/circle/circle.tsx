"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CircleProps {
  name: string;
  x: number;
  y: number;
  diameter: number; // 添加直径属性
  maxX: number;
  maxY: number;
}
const generateRandomColour = () => {
  return (
    "#" +
    ("000000" + Math.floor(Math.random() * 16777216).toString(16)).slice(-6)
  );
};

const generateSpeed = () => gsap.utils.random(100, 700);

const Circle: React.FC<CircleProps> = ({
  name,
  x,
  y,
  diameter,
  maxX,
  maxY,
}) => {
  let lastFinal: { x: number; y: number } = { x: 0, y: 0 };
  const [bgColour, setBgColour] = useState<string>(() =>
    generateRandomColour()
  );
  const [speed, setSpeed] = useState<number>(() => generateSpeed());
  const circleRef = useRef<HTMLDivElement>(null);

  function randx() {
    return gsap.utils.random(0, maxX);
  }
  function randy() {
    return gsap.utils.random(0, maxY);
  }

  const wander = () => {
    const randomList: { x: number; y: number }[] = [
      { x: 0, y: randy() },
      { x: randx(), y: 0 },
      { x: maxX, y: randy() },
      { x: randx(), y: maxY },
    ];
    let filteredList: { x: number; y: number }[] = [...randomList];

    if (lastFinal.x || lastFinal.y) {
      filteredList = filteredList.reduce((finalList, item) => {
        if (
          (lastFinal.x !== 0 || item.x !== 0) &&
          (lastFinal.y !== 0 || item.y !== 0) &&
          (lastFinal.x !== maxX || item.x !== maxX) &&
          (lastFinal.y !== maxY || item.y !== maxY)
        ) {
          finalList.push(item);
        }
        return finalList;
      }, [] as { x: number; y: number }[]);
    }
    const final =
      filteredList[Math.floor(gsap.utils.random(0, filteredList.length))];

    const time = () => {
      return (
        Math.sqrt((final.x - lastFinal.x) ** 2 + (final.y - lastFinal.y) ** 2) /
        speed
      );
    };

    // 時間 = 距離 / 速度

    gsap.to(circleRef.current, {
      ...final,
      duration: time(),
      ease: "none",
      onComplete: wander,
    });
    lastFinal = final;
  };
  let flag = true;
  useEffect(() => {
    if (flag) {
      wander(); // 开始球的随机移动
      flag = false;
    }
  }, []);

  return (
    <div
      ref={circleRef}
      className="circle text-white w-12 h-12 rounded-full flex items-center justify-center absolute"
      style={{
        position: "absolute",
        width: `${diameter}px`,
        height: `${diameter}px`,
        borderRadius: "50%",
        backgroundColor: `${bgColour}`,
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {name}
    </div>
  );
};

export default Circle;
