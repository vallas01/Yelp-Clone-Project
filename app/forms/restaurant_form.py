from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Restaurant

validators=[DataRequired()]

def address_exists(form, field):
  address = field.data
  restaurant = Restaurant.query.filter(Restaurant.address == address).first()
  if restaurant:
    raise ValidationError('Address is already in use')

class RestaurantForm(FlaskForm):
  name = StringField('Name', validators)
  user_id = IntegerField('UserId', validators)
  address = StringField('Address', validators=[DataRequired(), address_exists])
  city = StringField('City', validators)
  state = StringField('State', validators)
  zip = IntegerField('Zip Code', validators)
  description = TextAreaField('Description', validators)
  price = IntegerField('Price Tag', validators)
  category = StringField('Category', validators)
  lat = IntegerField('Latitude', validators)
  lng = IntegerField('Longittude', validators)
  logo = StringField('Logo', validators)



def address_exists_update (form, field):
  address = field.data
  restaurant = Restaurant.query.filter(Restaurant.address == address).first()
  if restaurant and restaurant.id != form.restaurant_id.data:
    raise ValidationError('Address is already in use')



class UpdateRestaurantForm(FlaskForm):
  restaurant_id = IntegerField("Restaurant Id", validators)
  name = StringField('Name', validators)
  user_id = IntegerField('UserId', validators)
  address = StringField('Address', validators=[DataRequired(), address_exists_update])
  city = StringField('City', validators)
  state = StringField('State', validators)
  zip = IntegerField('Zip Code', validators)
  description = TextAreaField('Description', validators)
  price = IntegerField('Price Tag', validators)
  category = StringField('Category', validators)
  lat = IntegerField('Latitude', validators)
  lng = IntegerField('Longittude', validators)
  logo = StringField('Logo', validators)
