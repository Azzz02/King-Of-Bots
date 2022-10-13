import { GameObject } from "./GameObject.js";
import { Snake } from "./Snake.js";
import { Wall } from "./Wall";
export class GameMap extends GameObject {
    constructor(ctx, parent) {
        super();
        this.ctx = ctx;
        this.parent = parent;

        this.L = 0;

        this.rows = 13;
        this.cols = 14;


        this.inner_walls_count = 30;
        this.walls = [];

        this.snakes = [
            new Snake({ id: 0, color: "#4876EC", r: this.rows - 2, c: 1 }, this),
            new Snake({ id: 1, color: "#F94848", r: 1, c: this.cols - 2 }, this)
        ];

    }

    check_ready() { //判断两条蛇是否准备好了下一回合
        for (const snake of this.snakes) {
            if (snake.status !== "stop") return false;
            if (snake.direction === -1) return false;
        }
        return true;
    }

    check_die(cell) {//判断是否撞到障碍
        for (const wall of this.walls) {
            if (cell.c === wall.c && cell.r === wall.r) return false;
        }

        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_add()) {
                k--;
            }
            for (let i = 0; i < k; i++) {
                if (snake.cells[i].x === cell.x && snake.cells[i].y === cell.y) {
                    return false;
                }
            }
        }
        return true;
    }

    check_ok(g, sx, sy, ex, ey) {
        if (sx == ex && sy == ey) return true;
        g[sx][sy] = true;
        let dx = [-1, 0, 1, 0];
        let dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i];
            let y = sy + dy[i];
            if (!g[x][y] && this.check_ok(g, x, y, ex, ey)) {
                return true;
            }
        }
        return false;
    }

    create_walls() {
        const g = [];
        for (let r = 0; r < this.rows; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }

        //给四周加墙
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
        for (let c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;
                if (r == 1 && c == this.cols - 2 || r == this.rows - 2 && c == 1) continue;
                g[this.rows - 1 - r][this.cols - 1 - c] = g[r][c] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_ok(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }


    listening_events() {
        this.ctx.canvas.focus();
        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === "w") snake0.set_direction(0);
            else if (e.key === "d") snake0.set_direction(1);
            else if (e.key === "s") snake0.set_direction(2);
            else if (e.key === "a") snake0.set_direction(3);
            else if (e.key === "ArrowUp") snake1.set_direction(0);
            else if (e.key === "ArrowRight") snake1.set_direction(1);
            else if (e.key === "ArrowDown") snake1.set_direction(2);
            else if (e.key === "ArrowLeft") snake1.set_direction(3);

        })
    }


    start() {
        for (let i = 0; i < 10000; i++) {  //循环判断是否成功创建地图
            if (this.create_walls()) {
                break;
            }
        }
        this.listening_events();
    }


    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;

    }

    next_step() {
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }

    update() {
        this.update_size();
        if (this.check_ready()) {
            this.next_step();
        }
        this.render();
    }

    render() {
        const color_even = "#AAD751";
        const color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }

}