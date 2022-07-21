from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKgey('reviews.id'), nullable=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=True)
    title = db.Column(db.String(40), nullable=False)
    img_url = db.Column(db.Text, nullable=False)

    users = db.relationship("User", back_populates="images")
    reviews = db.relationship("Review", back_populates="images")
    restaurants = db.relationship("Restaurant", back_populates="images")
