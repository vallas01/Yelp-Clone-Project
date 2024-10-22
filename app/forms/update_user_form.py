from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


class UpdateUserForm(FlaskForm):
    def username_exists(form, field):
    # Checking if username is already in use
        username = field.data
        user = User.query.filter(User.username == username).first()

        if user and user.id != form.user_id.data:
            raise ValidationError('Username is already in use.')

    user_id = IntegerField('User Id', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), username_exists])
    city = StringField('city')
    address = StringField('address')
    state = StringField('state')
    zip = IntegerField('zip')
    avatar = StringField('avatar')
    hashed_password = StringField('hashed_password')
    email = StringField('email')
