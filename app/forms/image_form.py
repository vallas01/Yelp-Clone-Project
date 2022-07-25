from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ImageForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    img_url = IntegerField('Image-Url', validators=[DataRequired()])
