from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=True)
    text = db.Column(db.String(2000), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    users = db.relationship("User", back_populates="reviews")
    restaurants = db.relationship("Restaurant", back_populates="reviews")
    images = db.relationship("Image", back_populates='reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "restaurant_id": self.restaurant_id,
            "text": self.text,
            "rating": self.rating,
            "owner":self.users.to_dict(),
        }
        
    def to_dict_2(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "restaurant_id": self.restaurant_id,
            "text": self.text,
            "rating": self.rating,
        }
