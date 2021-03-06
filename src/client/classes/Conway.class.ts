function bool_by_percent(per: number): boolean {
  return per > Math.floor(Math.random() * 101);
}

export class Conway {
  private game_width: number;
  private game_height: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: Array<boolean[]>;
  private canvasx_in_pixels: number;
  private canvasy_in_pixels: number;
  constructor(x: number, y: number, percentage: number, canvas: any, width: number, height: number) {
    this.game_width = x;
    this.game_height = y;
    this.state = this.start_state(this.game_width, this.game_height, percentage);
    this.canvas = canvas;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    this.setBlockSize(width, height);
  }
  public turn = (): void => {
    if (this.state.length === 0) {
      return;
    }
    const newState: Array<boolean[]> = this.generation(this.state);
    this.state.splice(0, this.state.length);
    this.state = this.state.concat(newState);
    this.render(this.state);
  };
  private render = (gen: Array<boolean[]>): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let width: number = Math.floor(this.canvasx_in_pixels / this.game_width);
    let height: number = Math.floor(this.canvasy_in_pixels / this.game_height);
    gen.forEach((y: any[], i: number) => {
      y.forEach((x: boolean, j: number) => {
        if (x === true) {
          this.ctx.beginPath();
          this.ctx.fillStyle = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
            Math.random() * 256
          )})`;
          this.ctx.rect(width * j, height * i, width, height);
          this.ctx.fill();
          this.ctx.closePath();
        }
      });
    });
  };
  private generation = (prev: Array<boolean[]>): Array<boolean[]> => {
    let newArr: any[] = [];
    prev.forEach((col: any[], y) => {
      let line: any[] = [];
      col.forEach((cell: boolean, x) => {
        line.push(this.rule(x, y, cell, prev));
      });
      newArr.push(line);
    });
    return newArr;
  };
  private rule = (x: number, y: number, alive: boolean, prev: Array<boolean[]>): boolean => {
    const living: number = this.living_neighbors(x, y, prev);
      return (living === 2 && alive) || living === 3;
  };
  private living_neighbors = (posx: number, posy: number, prev: Array<boolean[]>): number => {
    // returns the amount of 'living' neighbors
    let living: number = 0;
    for (let y = posy - 1; y <= posy + 1; y++) {
      for (let x = posx - 1; x <= posx + 1; x++) {
        if (x === posx && y === posy) {
          // skip itself
        } else if (y > -1 && x > -1 && x < this.game_width && y < this.game_height) {
          if (prev[y][x] === true) {
            living++;
          }
        }
      }
    }
    return living;
  };
  private start_state(x: number, y: number, percentage: number): Array<boolean[]> {
    let state: any[] = [];
    for (let i = 0; i < y; i++) {
      state.push([]);
      for (let j = 0; j < x; j++) {
        state[i].push(bool_by_percent(percentage));
      }
    }
    return state;
  }
  public setBlockSize(width: number, height: number) {
    this.canvasx_in_pixels = width;
    this.canvasy_in_pixels = height;
  }
}
