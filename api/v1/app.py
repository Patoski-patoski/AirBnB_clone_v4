#!/usr/bin/python3
""" app.py module
"""

from models import storage
from flask import Flask, make_response
from os import getenv
from api.v1.views import app_views
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})


@app.teardown_appcontext
def teardown_appcontext(exception):
    """ close  storage """
    storage.close()


@app.errorhandler(404)
def handle_error(error):
    """ returns JSON object ass error message """
    return make_response({"error": "Not found"}, 404)


if __name__ == "__main__":
    HBNB_API_HOST = getenv('HBNB_API_HOST')
    HBNB_API_PORT = getenv('HBNB_API_PORT')
    app.run(host=HBNB_API_HOST, port=HBNB_API_PORT, threaded=True)
