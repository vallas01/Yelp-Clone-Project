from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, db
from app.forms.review_form import ReviewForm


review_routes = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



@review_routes.route('')
@login_required
def review_get():
    review = Review.query.all()
    return {'review': [review.to_dict() for review in reviews]}

@review_routes.route('', methods=['POST'])
def review_post():
    """
    Creates a new review
    """
    form = ReviewForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
   
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            user_id = 1,
            restaurant_id = 1,
            text = form.data['text'],
            rating = form.data['rating'],
            )
        db.session.add(new_review)
        db.session.commit()
        
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
   