from flask import Blueprint, jsonify
from app.models import Restaurant

user_routes = Blueprint('restaurant', __name__)


@user_routes.route('/')
@login_required
def users():
    users = Restaurant.query.all()
    return {'users': [user.to_dict() for restaurants in restaurants]}