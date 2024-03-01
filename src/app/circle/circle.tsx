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

const Circle: React.FC<CircleProps> = ({
  name,
  x,
  y,
  diameter,
  maxX,
  maxY,
}) => {
  let lastFinal: { x: number; y: number } | any = null;
  const [bgColour, setBgColour] = useState<string>(() =>
    generateRandomColour()
  );
  const circleRef = useRef<HTMLDivElement>(null);

  console.log(bgColour);
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
    let filteredList = [...randomList];
    if (lastFinal !== null) {
      filteredList = [...randomList].filter(
        (item) => item.x !== lastFinal.x || item.y !== lastFinal.y
      );
    }
    const final = filteredList[Math.floor(gsap.utils.random(0, 4))];
    console.log(final);

    gsap.to(circleRef.current, {
      ...final,
      duration: 3,
      ease: "none",
      onComplete: wander,
    });
  };
  let flag = true;
  useEffect(() => {
    if (flag) {
      console.log(name, x, y, diameter, maxX, maxY);
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
