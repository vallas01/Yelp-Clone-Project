from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms.update_user_form import UpdateUserForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    users_obj = {}
    for user in users:
        users_obj[user.id] = user.to_dict()

    return users_obj


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    form = UpdateUserForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)

        user.username = form.username.data
        user.address = form.address.data
        user.city = form.city.data
        user.state = form.state.data
        user.zip = form.zip.data
        user.avatar = form.avatar.data
        # user.hashed_password
        # user.email = form.email.data
        db.session.commit()
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}
