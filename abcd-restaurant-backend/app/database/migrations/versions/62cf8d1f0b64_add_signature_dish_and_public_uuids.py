"""add_signature_dish_and_public_uuids

Revision ID: 62cf8d1f0b64
Revises: 81ce7096e93f
Create Date: 2026-10-15 18:26:27.876483

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '62cf8d1f0b64'
down_revision: Union[str, Sequence[str], None] = '81ce7096e93f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # 1. Add is_signature_dish to menu_items
    op.add_column('menu_items', sa.Column('is_signature_dish', sa.Boolean(), server_default='false', nullable=False))

    # 2. Add public_id to orders
    op.add_column('orders', sa.Column('public_id', sa.String(length=36), nullable=True))
    op.create_index('ix_orders_public_id', 'orders', ['public_id'], unique=True)

    # 3. Add public_id to reservations
    op.add_column('reservations', sa.Column('public_id', sa.String(length=36), nullable=True))
    op.create_index('ix_reservations_public_id', 'reservations', ['public_id'], unique=True)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('ix_reservations_public_id', table_name='reservations')
    op.drop_column('reservations', 'public_id')

    op.drop_index('ix_orders_public_id', table_name='orders')
    op.drop_column('orders', 'public_id')

    op.drop_column('menu_items', 'is_signature_dish')
