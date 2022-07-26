from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    image1 = Image(
        user_id=1, review_id=1, restaurant_id=1, title='food 1', img_url='https://www.usfoods.com/content/usfoods-dce/en/_jcr_content/slideshow-container/slider-container/slide-2/image3.img.jpg/1652723797351.jpg'
    )
    image2 = Image(
        user_id=2, review_id=2, restaurant_id=1, title='food 2', img_url='https://static01.nyt.com/images/2021/02/17/dining/17tootired-grilled-cheese/17tootired-grilled-cheese-articleLarge.jpg?quality=75&auto=webp&disable=upscale'
    )
    image3 = Image(
        user_id=1, review_id=3, restaurant_id=2, title='food 3', img_url='https://www.seriouseats.com/thmb/kCgg9kZtw77r8VMPiS0bCZjfrV4=/735x0/ultimate-extra-crispy-double-fried-confit-buffalo-wings-hero-01-05ad3ec0ad5d4de8bcf1cffaff811259.JPG'
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
