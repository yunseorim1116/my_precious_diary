import { randomBetween } from './randomBetween'


export class Rain {
    constructor(private x: number,private y: number, private velocity:{x:number,y:number}, private ctx :CanvasRenderingContext2D) {
      //빗방울 생성자
      //x좌표,y좌표,속도
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.ctx = ctx
    }

    drawRain() { //canvas 빗방울 그리는 함수
        const { x,y,velocity,ctx} = this
        ctx.beginPath();
        ctx.moveTo(x,y)
        ctx.lineTo(x + velocity.x ,y + velocity.y)
        ctx.stroke();
    }

    animate(){
      if(this.y > window.innerHeight){
        this.x = randomBetween(0,window.innerWidth)
        this.y = -20
      }
      this.x += this.velocity.x
      this.y += this.velocity.y
      this.drawRain()
    }
  }