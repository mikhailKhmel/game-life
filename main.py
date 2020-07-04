import flask
import core
import json

app = flask.Flask(__name__, static_folder="static")
cells = core.Cells(20, 20)


@app.route('/', methods=['GET'])
def hello_world():
    req_json = flask.request.get_json()
    if req_json:
        if req_json['type'] == 'get_gen_cells':
            cells.gen_alive_cells()
            result = [o.dump() for o in cells.cells]
            return json.dumps({"result": result})
    else:
        return app.send_static_file("index.html")


# @app.route('/<path:path>')
# def static_file(path):
#     return app.send_static_file(path)
