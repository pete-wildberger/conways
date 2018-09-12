function bool_by_percent(per: number): boolean {
  return per > Math.floor(Math.random() * 101);
}

export class Conway {
  private game_width: number;
  private game_height: number;
  private canvas: any;
  private ctx: CanvasRenderingContext2D;
  private state: any[];
  public canvasx_in_pixels: number;
  public canvasy_in_pixels: number;
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
  public turn = () => {
    if (this.state.length === 0) {
      return;
    }
    let newState: any[] = this.generation(this.state);
    this.state.splice(0, this.state.length);
    this.state = this.state.concat(newState);
    this.render(this.state);
  };
  public render = (gen: any[]): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let width: number = Math.floor(this.canvasx_in_pixels / this.game_width);
    let height: number = Math.floor(this.canvasy_in_pixels / this.game_height);
    gen.forEach((y: any[], i: number) => {
      y.forEach((x: boolean, j: number) => {
        if (x === true) {
          this.ctx.beginPath();
          this.ctx.fillStyle = `blue`;
          this.ctx.rect(width * j, height * i, width, height);
          this.ctx.fill();
          this.ctx.closePath();
        }
      });
    });
  };
  public generation = (prev: any[]): any[] => {
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
  private rule = (x: number, y: number, alive: boolean, prev: any[]): boolean => {
    const living = this.living_neighbors(x, y, prev);
    if (alive) {
      if (living < 2 || living > 3) {
        //Any live cell with fewer than two live neighbors dies, as if by under population.
        //Any live cell with more than three live neighbors dies, as if by overpopulation.
        return false;
      } else if (living === 2 || living === 3) {
        //Any live cell with two or three live neighbors lives on to the next generation.
        return true;
      }
    } else if (alive === false && living === 3) {
      //Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
      return true;
    } else {
      return false;
    }
  };
  private living_neighbors = (posx: number, posy: number, prev: any[]): number => {
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
  private start_state(x: number, y: number, percentage: number): any[] {
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
