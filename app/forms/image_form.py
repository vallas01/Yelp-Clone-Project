from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    userId = IntegerField('User-Id', validators=[DataRequired()])
    img_url = TextAreaField('Image-Url', validators=[DataRequired()])
    restaurant_id = IntegerField('Restaurant-Id', validators=[DataRequired()])
    review_id = IntegerField('Review-Id')
