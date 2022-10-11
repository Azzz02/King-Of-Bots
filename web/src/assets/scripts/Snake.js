import {Cell} from "./Cell";
import {GameObject} from "./GameObject";

export class Snake extends GameObject {
    constructor(info, gamemap) {
        super();
        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.nextcell = null;//下一步目的地
        this.cells = [new Cell(info.r, info.c)];//存放身体
        this.speed = 5;//蛇每秒走5格子

        this.direction = -1;//0 1 2 3 上右下左
        this.status = "stop";

        this.dr = [-1, 0, 1, 0];
        this.dc = [0, 1, 0, -1];
        this.step = 0;
        this.eps = 1e-2;//允许的误差精度
        this.eye_direction=0;
        if(this.id===1){
            this.eye_direction=2;
        }

        this.eye_dx=[
            [-1,1],[1,1],[1,-1],[-1,-1]
        ]
        this.eye_dy=[
            [-1,-1],[-1,1],[1,1],[1,-1]
        ]
    }

    set_direction(d) {
        this.direction = d;
    }

    start() {

    }


    check_add() {//判断是否增长
        if (this.step <= 10) return true;
        if (this.step % 3 === 1) return true;
        return false;
    }

    next_step() {//将蛇状态更新到下一步
        const d = this.direction;
        this.nextcell = new Cell(this.cells[0].r + this.dr[d], this.cells[0].c + this.dc[d]);
        this.direction = -1;//清空方向
        this.eye_direction=d;
        this.status = "move";
        this.step++;

        const k = this.cells.length;
        for (let i = k; i > 0; i--) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        if(!this.gamemap.check_die(this.nextcell)){
            this.status="die";
        }
    }

    update_move() {
        const dx = this.nextcell.x - this.cells[0].x;
        const dy = this.nextcell.y - this.cells[0].y;
        const dis = Math.sqrt(dx * dx + dy * dy);
        if (dis < this.eps) {
            this.cells[0] = this.nextcell;
            this.nextcell = null;
            this.status = "stop";

            if (!this.check_add()) {
                this.cells.pop()
            }

        } else {
            const mov_dis = this.speed * this.timedelta / 1000;
            this.cells[0].x += mov_dis * dx / dis;
            this.cells[0].y += mov_dis * dy / dis;

            if (!this.check_add()) {
                const k = this.cells.length;
                const tail = this.cells[k - 1];
                const next_tail = this.cells[k - 2];
                const tail_dx = next_tail.x - tail.x;
                const tail_dy = next_tail.y - tail.y;
                tail.x += mov_dis * tail_dx / dis;
                tail.y += mov_dis * tail_dy / dis;
            }

        }
    }

    update() {
        if (this.status === 'move') {
            this.update_move();
        }
        this.render();
    }

    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        ctx.fillStyle = this.color;

        if(this.status==='die'){
            ctx.fillStyle="white";
        }

        for (const cell of this.cells) {
            ctx.beginPath();
            ctx.arc(cell.x * L, cell.y * L, L / 2*0.8, 0, Math.PI * 2);
            ctx.fill();
        }

        for (let i = 1; i < this.cells.length; i++) {
            const a = this.cells[i - 1];
            const b = this.cells[i];
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps) continue;
            if (Math.abs(a.x - b.x) < this.eps) {
                ctx.fillRect((a.x - 0.4) * L, Math.min(a.y, b.y)*L, L*0.8, Math.abs(a.y - b.y) * L);
            } else {
                ctx.fillRect(Math.min(a.x, b.x)*L, (a.y-0.4)*L, Math.abs(a.x - b.x) * L, L*0.8);
            }
        }

        ctx.fillStyle="black";
        for (let i = 0; i < 2; i++) {
            const eye_x=(this.cells[0].x+this.eye_dx[this.eye_direction][i]*0.2)*L;
            const eye_y=(this.cells[0].y+this.eye_dy[this.eye_direction][i]*0.2)*L;
            ctx.beginPath();
            ctx.arc(eye_x,eye_y,L*0.05,0,Math.PI*2);
            ctx.fill();
        }

    }

}