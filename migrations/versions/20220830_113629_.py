"""empty message

Revision ID: e7236a34ac21
Revises: d8bc033e62e4
Create Date: 2022-08-30 11:36:29.314119

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e7236a34ac21'
down_revision = 'd8bc033e62e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('restaurants', sa.Column('menuImg', sa.Text(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('restaurants', 'menuImg')
    # ### end Alembic commands ###
