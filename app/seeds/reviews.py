from app.models import db, Review


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(
        user_id=3, restaurant_id=1, text='Very nice.', rating=4
    )
    review2 = Review(
        user_id=2, restaurant_id=1, text='Just ok', rating=3
    )
    review3 = Review(
        user_id=1, restaurant_id=2, text='Big Brapping Beter, Beautiful Burg Eating, Borgir-Bunging, Bodacious Buttery Bunger-Back Baby Bernie Sanders Approved, Bitten Boundless Beyond Burger.', rating=5
    )
    review4 = Review(
        user_id=3, restaurant_id=2, text='guh.', rating=2
    )
    review5 = Review(
        user_id=2, restaurant_id=3, text='epic.', rating=5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
