import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';
import { ThresholdFilter } from '../utils/ThresholdFilter';

// import { AsciiFilter, AdvancedBloomFilter } from 'pixi-filters';
// import Matter from 'matter-js';
// import testTexture from './textures/test.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <Body />
    </div>
  );
}

function Body() {
  const canvasWrap = useRef();
  useEffect(() => {
    // buildBody();
    // buildMatter();
    BuildMetaBall();
  })
  const buildMatter = () => {

    var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    var engine = Engine.create({
      // positionIterations: 20
    });

    var render = Render.create({
      element: canvasWrap.current,
      engine: engine,
      options: {
        width: 600,
        height: 600,
        wireframes: false
      }
    });

    var ballA = Bodies.circle(210, 100, 30, { restitution: 0.5 });
    var ballB = Bodies.circle(110, 50, 30, { restitution: 0.5 });
    World.add(engine.world, [
      // walls
      // Bodies.rectangle(200, 0, 600, 50, { isStatic: true }),
      Bodies.rectangle(200, 600, 600, 50, { isStatic: true }),
      // Bodies.rectangle(260, 300, 50, 600, { isStatic: true }),
      // Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    // World.add(engine.world, [ballA, ballB]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, "mousedown", function (event) {
      World.add(engine.world, Bodies.circle(150, 50, 30, { restitution: 0.7 }));
    });

    Engine.run(engine);

    Render.run(render);
  }
  const buildBody = () => {

    // init
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffbbbb,
      resolution: window.devicePixelRatio || 1,
    });
    canvasWrap.current.appendChild(app.view);

    // Build container on canvas?
    const container = new PIXI.Container();
    app.stage.addChild(container);
    
    // Register texture
    const texture = PIXI.Texture.from(testTexture)

    // Build sprit from textures
    const test = new PIXI.Sprite(texture);
    test.x = 100;
    test.y = 200;
    container.addChild(test);


  }

  const BuildMetaBall = () => {
    // init
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffbbbb,
      resolution: window.devicePixelRatio || 1,
    });
    canvasWrap.current.appendChild(app.view);

    // Build container on canvas?
    const container = new PIXI.Container();
    app.stage.addChild(container);

    // Build sprit from textures
    var staticCircle = new PIXI.Graphics();
    staticCircle.lineStyle(0);
    staticCircle.beginFill(0x000000, 1);
    staticCircle.drawCircle(app.screen.width / 2, app.screen.height / 2, 100);
    staticCircle.endFill();
    container.addChild(staticCircle);

    var thresholdFilter = new ThresholdFilter();
    thresholdFilter.uniforms.threshold = 0.5;

    var blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 30;
    blurFilter.autoFit = true;
    
    app.stage.filters = [blurFilter, thresholdFilter];

    var gui = new dat.GUI();
    gui.add(blurFilter, 'blur', 0, 100);

  }
  return (
    <div className="wrap" ref={canvasWrap}></div>
  )
}

export default App;
