from app.models import db, Restaurant


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    place1 = Restaurant(
        user_id='1', name='Kelpo', address('This Way 1234'), city='San Francisco', state='CA', zip=12345, description='Epic place for kelp.', category='Donuts', price=3, lat=123, lng=123, logo='https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    )
    place2 = Restaurant(
        user_id='2', name='Borgar', address('This Way 5678'), city='San Francisco', state='CA', zip=12345, description='Ooh burger.', category='Burgers', price=4, lat=234, lng=234, logo='https://media.istockphoto.com/photos/two-empty-wine-glasses-sitting-in-a-restaurant-on-a-warm-sunny-picture-id1018141890?k=20&m=1018141890&s=612x612&w=0&h=uMDP00MMIhlwQE77EEcoelc2oSKBT_B6avaXqtxgiow='
    )
    place3 = Restaurant(
        user_id='3', name='Taco Epic', address('That Way 1234'), city='San Francisco', state='CA', zip=12345, description='Yummy tacos and more.', category='Tacos', price=5, lat=345, lng=345, logo='https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    )
    place4 = Restaurant(
        user_id='1', name='Mepsi', address('That Way 3456'), city='San Francisco', state='CA', zip=12345, description='Here for Pilk! (pepsi milk)', category='Donuts', price=6, lat=456, lng=456, logo='https://i.ytimg.com/vi/5Mu1gUmhycM/maxresdefault.jpg'
    )
    place5 = Restaurant(
        user_id='2', name='Some Place', address('Over There 4312'), city='San Francisco', state='CA', zip=12345, description='That one place with that kind of food.', category='Tacos', price=3, lat=567, lng=567, logo='https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80'
    )
    place6 = Restaurant(
        user_id='3', name='MgRonalds', address('Over There 3421'), city='San Francisco', state='CA', zip=12345, description='Get those MgNuggies.', category='Burgers', price=4, lat=678, lng=678, logo='https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg'
    )
    place7 = Restaurant(
        user_id='1', name='Dohznuts', address('This Way 8756'), city='San Francisco', state='CA', zip=12345, description='How Dohznuts taste?', category='Donuts', price=5, lat=789, lng=789, logo='https://images.prismic.io/stocktc/448c3762-f364-4a21-82f5-bacec18d1d0a_untitled-4.png?auto=compress,format'
    )
    place8 = Restaurant(
        user_id='2', name='Wumbo', address('That Way 6754'), city='San Francisco', state='CA', zip=12345, description='Wumbology the study of wumbo.', category='Donuts', price=7, lat=321, lng=321, logo='https://www.charlotteobserver.com/latest-news/6mt0to/picture260170475/alternates/FREE_1140/IMG_8525.jpeg'
    )

    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.add(place4)
    db.session.add(place5)
    db.session.add(place6)
    db.session.add(place7)
    db.session.add(place8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_restaurants():
    db.session.execute('TRUNCATE restaurants RESTART IDENTITY CASCADE;')
    db.session.commit()
