from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Restaurant, db
from app.forms import RestaurantForm, UpdateRestaurantForm

restaurant_routes = Blueprint('restaurant', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages




@restaurant_routes.route('/')
# @login_required
def restaurant_get():
    restaurants = Restaurant.query.all()
    return {'restaurant': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('', methods =["POST"])
def add_restaurant():
    form = RestaurantForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_restaurant = Restaurant(
            user_id = form.data["user_id"],
            name = form.data["name"],
            address = form.data["address"],
            city = form.data["city"],
            state = form.data["state"],
            zip = form.data["zip"],
            description = form.data["description"],
            category = form.data["category"],
            price = form.data["price"],
            lat = form.data["lat"],
            lng = form.data["lng"],
            logo = form.data["logo"]
            )
        db.session.add(new_restaurant)
        db.session.commit()

        return new_restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


    # return {'restaurant': 'done'}
    #     pass

@restaurant_routes.route('', methods=["PUT"])
def update_restaurant():
    form = UpdateRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        restaurant = Restaurant.query.get(form.restaurant_id.data)

        restaurant.name = form.name.data
        restaurant.address = form.address.data
        restaurant.city = form.city.data
        restaurant.state = form.state.data
        restaurant.zip = form.zip.data
        restaurant.description = form.description.data
        restaurant.category = form.category.data
        restaurant.price = form.price.data
        restaurant.lat = form.lat.data
        restaurant.lng = form.lng.data
        restaurant.logo = form.logo.data
        db.session.commit()
        return restaurant.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}



@restaurant_routes.route('/<int:id>', methods =["DELETE"])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    db.session.delete(restaurant)
    db.session.commit()
    return ({"done": "complete"})
