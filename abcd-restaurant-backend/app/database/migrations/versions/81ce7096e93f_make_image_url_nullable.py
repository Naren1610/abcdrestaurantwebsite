"""make_image_url_nullable

Revision ID: 81ce7096e93f
Revises: dbd02edff032
Create Date: 2026-10-15 11:40:30.643047

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '81ce7096e93f'
down_revision: Union[str, Sequence[str], None] = 'dbd02edff032'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.alter_column('menu_items', 'image_url',
               existing_type=sa.VARCHAR(length=500),
               nullable=True)


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column('menu_items', 'image_url',
               existing_type=sa.VARCHAR(length=500),
               nullable=False)
