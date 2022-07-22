from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Image

image_routes = Blueprint('image', __name__)


@image_routes.route('/')
@login_required
def image_get():
    image = Image.query.all()
    return {'image': [image.to_dict() for image in images]}

@image_routes.route('/', methods=['post'])
def image_post():
