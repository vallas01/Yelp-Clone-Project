from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Image
from app.forms.image_form import ImageForm

image_routes = Blueprint('image', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@image_routes.route('/')
@login_required
def image_get():
    image = Image.query.all()
    return {'image': [image.to_dict() for image in images]}

@image_routes.route('/', methods=['post'])
def image_post():
     form = ImageForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_img = Image(
            user_id = 1,
            restaurant_id = 1,
            review_id = 1,
            title = form.data['title'],
            img_url = form.data['img_url'],
            )
        db.session.add(new_img)
        db.session.commit()

        return new_img.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
