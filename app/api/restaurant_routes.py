from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Restaurant

restaurant_routes = Blueprint('restaurant', __name__)


@restaurant_routes.route('/')
@login_required
def restaurant_get():
    restaurant = Restaurant.query.all()
    return {'restaurant': [restaurant.to_dict() for restaurant in restaurants]}