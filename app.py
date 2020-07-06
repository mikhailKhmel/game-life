import flask
import game

app = flask.Flask(__name__, static_folder="static", template_folder="templates")
cells = game.Cells(80, 80)


@app.route('/', methods=['GET', 'POST'])
def hello_world():
    req_json = flask.request.get_json()
    if req_json:
        if req_json['type'] == 'get_gen_cells':
            cells.gen_alive_cells()
        elif req_json['type'] == 'one_step':
            cells.one_step()
        elif req_json['type'] == 'clear':
            cells.clean_cells()
        dump = cells.dump()
        return {'result': dump}
    else:
        return flask.render_template("index.html")
