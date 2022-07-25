from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    user_id = IntegerField('UserId',validators=[DataRequired()])
    restaurant_id = IntegerField('RestaurantId',validators=[DataRequired()])
    text = StringField('Review', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    