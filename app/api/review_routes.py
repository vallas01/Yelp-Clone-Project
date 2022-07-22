from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

review_routes = Blueprint('review', __name__)


@review_routes.route('/')
@login_required
def review_get():
    review = Review.query.all()
    return {'review': [review.to_dict() for review in reviews]}