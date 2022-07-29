from .db import db


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    user_id	= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    address	= db.Column(db.String(255), nullable=False, unique=True)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    zip	= db.Column(db.Integer, nullable=False)
    description	= db.Column(db.String(1000), nullable=False)
    category = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    lat	= db.Column(db.Integer, nullable=False)
    lng	= db.Column(db.Integer, nullable=False)
    logo = db.Column(db.String(255), nullable=True)

    user = db.relationship("User", back_populates="restaurants")
    images = db.relationship("Image", back_populates="restaurants")
    reviews = db.relationship("Review", back_populates="restaurants")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "category": self.category,
            "description": self.description,
            "price": self.price,
            "lat": self.lat,
            "lng": self.lng,
            "logo": self.logo
        }

    def to_dict_2(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip": self.zip,
            "category": self.category,
            "description": self.description,
            "price": self.price,
            "lat": self.lat,
            "lng": self.lng,
            "logo": self.logo,
            "owner": self.user.to_dict(),
            "images": [image.to_dict() for image in self.images],
            "reviews": [review.to_dict() for review in self.reviews],
        }
