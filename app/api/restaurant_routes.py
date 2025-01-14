from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required
from app.models import Restaurant, db, Review
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




@restaurant_routes.route('')
def restaurant_get():
    restaurants = Restaurant.query.all()
    return {'restaurant': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('', methods =["POST"])
@login_required
def add_restaurant():
    form = RestaurantForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(form.data)
        new_restaurant = Restaurant(
            user_id = form.data["user_id"],
            name = form.data["name"],
            address = form.data["address"],
            city = form.data["city"],
            state = form.data["state"],
            zip = form.data["zip"],
            category = form.data["category"],
            description = form.data["description"],
            price = form.data["price"],
            lat = form.data["lat"],
            lng = form.data["lng"],
            logo = form.data["logo"],
            menuImg = form.data["menuImg"]
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
        restaurant.menuImg = form.menuImg.data
        db.session.commit()
        return restaurant.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@restaurant_routes.route('/<int:id>', methods =["DELETE"])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    db.session.delete(restaurant)
    db.session.commit()
    return ({"done": "complete"})


@restaurant_routes.route('2')
def restaurant_get2():
    restaurants = Restaurant.query.all()
    return {'restaurant': [restaurant.to_dict_2() for restaurant in restaurants]}
