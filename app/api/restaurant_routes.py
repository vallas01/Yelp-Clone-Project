from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Restaurant
from app.forms import RestaurantForm

restaurant_routes = Blueprint('restaurant', __name__)


@restaurant_routes.route('/')
# @login_required
def restaurant_get():
    restaurants = Restaurant.query.all()
    return {'restaurant': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('/', methods =["POST"])
def add_restaurant():
    # form = RestaurantForm()
    # if form.validate_on_submit():
    return {'restaurant': 'done'}
    #     pass
