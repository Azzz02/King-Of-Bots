const Game_Objects = []

export class GameObject {
    constructor() {
        Game_Objects.push(this);
        this.timedelta = 0;
        this.has_start = false;
    }

    start() { //只执行一次

    }


    update() { //除了第一帧每次都执行

    }


    ondestroy() { //删除之前执行

    }

    destroy() {  //销毁当前对象
        this.ondestroy();
        for (let i in Game_Objects) {
            const obj = Game_Objects[i];
            if (obj === this) {
                Game_Objects.splice(i);
                break;
            }
        }
    }



}

let last_timestamp;//上一次执行时刻
const step = timestamp => {
    for (let obj of Game_Objects) {
        if (!obj.has_start) {
            obj.has_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step)
}

requestAnimationFrame(step)