import random


class Cell:
    x: int
    y: int
    status: bool  # false - died, true - alive
    neighbors_count: int

    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.status = False
        self.neighbors_count = 0

    def dump(self):
        return {"x": self.x, "y": self.y, "status": self.status, "neighbors_count": self.neighbors_count}


class Cells:
    cells: dict
    width: int
    height: int

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.cells = {j + self.width * i: Cell(i, j) for i in range(self.width) for j in range(self.height)}

    def dump(self):
        return [{key: item.dump() for key, item in self.cells.items()}]

    def clean_cells(self):
        self.cells = {j + self.width * i: Cell(i, j) for i in range(self.width) for j in range(self.height)}

    def gen_alive_cells(self):
        self.clean_cells()
        for i in range(int(len(self.cells) / 2)):
            random_id = random.randint(0, len(self.cells) - 1)
            self.cells[random_id].status = True
        self.update_neighbors()

    def update_neighbors(self):
        for curr_cell in self.cells.keys():
            self.cells[curr_cell].neighbors_count = self.get_neighbors_count(self.cells[curr_cell].x,
                                                                             self.cells[curr_cell].y)

    def get_neighbors_count(self, current_x: int, current_y: int) -> int:
        count = 0
        for i in range(current_x - 1, current_x + 2):
            for j in range(current_y - 1, current_y + 2):
                if (i == current_x) and (j == current_y):
                    pass
                else:
                    if i < 0 or j < 0 or i > self.width or j > self.width:
                        continue
                    else:
                        curr_id = j + self.width * i
                        try:
                            if self.cells[curr_id].status:
                                count += 1
                        except:
                            pass
        return count

    def one_step(self):
        for key, item in self.cells.items():
            if self.cells[key].status:
                if item.neighbors_count < 2 or item.neighbors_count > 3:
                    self.cells[key].status = False
            else:
                if item.neighbors_count == 3:
                    self.cells[key].status = True
        self.update_neighbors()
