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
    cells: list
    width: int
    height: int

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.cells = [Cell(i, j) for i in range(width) for j in range(height)]

    def return_cells(self):
        return self.cells

    def gen_alive_cells(self):
        for i in range(int(len(self.cells) / 2)):
            random_x = random.randint(0, self.width)
            random_y = random.randint(0, self.height)
            for j in self.cells:
                if j.x == random_x and j.y == random_y:
                    j.status = True
                    break
        self.update_neighbors()

    def update_neighbors(self):
        for curr_cell in self.cells:
            for i in range(self.width):
                for j in range(self.height):
                    if curr_cell.x == i and curr_cell.y == j:
                        curr_cell.neighbors_count = self.get_neighbors_count(i, j)

    def get_neighbors_count(self, current_x: int, current_y: int) -> int:
        count = 0

        for i in range(current_x - 1, current_x + 2):
            for j in range(current_y - 1, current_y + 2):
                if (i == current_x) and (j == current_y):
                    pass
                else:
                    try:
                        for a in self.cells:
                            if a.x == i and a.y == j:
                                if a.status:
                                    count += 1
                    except:
                        pass
        return count


def one_step(self):
    for i in range(self.width):
        for j in range(self.height):
            curr_cell = self.cells[self.cells.index(Cell(i, j))]
            if curr_cell.status:
                if curr_cell.neighbors_count < 2 or curr_cell.neighbors_count > 3:
                    curr_cell.status = False
                    self.cells[self.cells.index(Cell(i, j))] = curr_cell
            else:
                if curr_cell.neighbors_count == 3:
                    curr_cell.status = True
                    self.cells[self.cells.index(Cell(i, j))] = curr_cell

    self.update_neighbors()
