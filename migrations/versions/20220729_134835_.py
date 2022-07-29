"""empty message

Revision ID: d8bc033e62e4
Revises: f8b23eaa0964
Create Date: 2022-07-29 13:48:35.121229

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd8bc033e62e4'
down_revision = 'f8b23eaa0964'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('restaurants_name_key', 'restaurants', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('restaurants_name_key', 'restaurants', ['name'])
    # ### end Alembic commands ###