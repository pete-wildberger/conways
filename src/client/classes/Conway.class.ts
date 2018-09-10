function bool_by_percent(per: number): boolean {
	return per >= Math.floor(Math.random() * 101);
}

export class Conway {
	private game_width: number;
	private game_height: number;
	private canvas: any;
	private ctx: CanvasRenderingContext2D;
	private state: any[];
	constructor(x: number, y: number, percentage: number) {
		this.game_width = x;
		this.game_height = y;
		this.state = this.start_state(this.game_width, this.game_height, percentage);
		this.canvas = document.getElementById('gOL');
		this.ctx = this.canvas.getContext('2d');
		this.render();
	}
	public render = (): void => {
		console.log(this.state);
	};
	public generation = (prev: any[]): any[] => {
		let newArr: any[] = [];
		prev.forEach((col: any[], y) => {
			let line: any[] = col.map((cell: boolean, x) => {
				return this.rule(x, y, cell, prev);
			});
			newArr.push(line);
		});
		return newArr;
	};
	private rule = (x: number, y: number, alive: boolean, prev: any[]): boolean => {
		const living = this.living_neighbors(x, y, prev);
		let result: boolean;

		if (living < 2 || living > 3) {
			//Any live cell with fewer than two live neighbors dies, as if by under population.
			//Any live cell with more than three live neighbors dies, as if by overpopulation.
			result = false;
		}

		if ((living >= 2 && living < 3) || (alive === false && living === 3)) {
			//Any live cell with two or three live neighbors lives on to the next generation.
			//Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
			result = true;
		}

		return result;
	};
	private living_neighbors(posx: number, posy: number, prev: any[]): number {
		// returns the amount of 'living' neighbors
		let living: number;
		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				if (x === 0 && y === 0) {
					// skip itself
				} else if (prev[posy + y][posx + x] === true) {
					living++;
				}
			}
		}
		return living;
	}
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
}
