from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError

validators=[DataRequired()]
class RestaurantForm(FlaskForm):
  name = StringField('Name', validators)
  user_id = IntegerField('UserId', validators)
  address = StringField('Address', validators)
  city = StringField('City', validators)
  state = StringField('State', validators)
  zip = IntegerField('Zip Code', validators)
  description = TextAreaField('Description', validators)
  price = IntegerField('Price Tag', validators)
  category = StringField('Category', validators)
  lat = IntegerField('Latitude', validators)
  lng = IntegerField('Longittude', validators)
  logo = StringField('Logo', validators)

class UpdateRestaurantForm(FlaskForm):
  restaurant_id = IntegerField("Restaurant Id", validators)
  name = StringField('Name', validators)
  user_id = IntegerField('UserId', validators)
  address = StringField('Address', validators)
  city = StringField('City', validators)
  state = StringField('State', validators)
  zip = IntegerField('Zip Code', validators)
  description = TextAreaField('Description', validators)
  price = IntegerField('Price Tag', validators)
  category = StringField('Category', validators)
  lat = IntegerField('Latitude', validators)
  lng = IntegerField('Longittude', validators)
  logo = StringField('Logo', validators)
