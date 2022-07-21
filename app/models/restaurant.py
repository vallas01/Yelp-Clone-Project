from .db import db


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    user_id	= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    address	= db.Column(db.String(40), nullable=False, unique=True)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(20), nullable=False)
    zip	= db.Column(db.Integer, nullable=False)
    description	= db.Column(db.String(20), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    lat	= db.Column(dbInteger, nullable=False)
    lng	= db.Column(db.Integer, nullable=False)
    logo = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="restaurants")