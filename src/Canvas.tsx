import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Rain } from "./utils/canvas/Rain";
import { randomBetween } from "./utils/canvas/randomBetween";

const Canvas = () => {
  const canvasElem = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasElem.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;

    let total; //빗방울의 갯수
    let rains: Rain[] = []; //빗방울 객체를 만들 배열 추가

    const init = () => {
      total = 80;
      rains = [];

      for (let i = 0; i < total; i++) {
        const x = randomBetween(0, window.innerWidth);
        const y = randomBetween(0, window.innerHeight);

        const velocity = {
          x: randomBetween(-1, 1),
          y: randomBetween(13, 18),
        };

        rains.push(new Rain(x, y, velocity, ctx));
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rains.forEach((el: Rain) => el.animate());
      window.requestAnimationFrame(render);
    };

    init();
    render();
  });

  return <CanvasStyle ref={canvasElem} />;
};

const CanvasStyle = styled.canvas`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
`;

export default Canvas;
