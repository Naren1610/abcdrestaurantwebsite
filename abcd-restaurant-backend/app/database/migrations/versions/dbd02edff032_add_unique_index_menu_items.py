"""add_unique_index_menu_items

Revision ID: dbd02edff032
Revises: 5ab7144ebd26
Create Date: 2026-10-05 21:12:26.958054

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dbd02edff032'
down_revision: Union[str, Sequence[str], None] = '5ab7144ebd26'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("CREATE UNIQUE INDEX ix_menu_items_category_name_unique ON menu_items (category_id, lower(trim(name)));")


def downgrade() -> None:
    """Downgrade schema."""
    op.execute("DROP INDEX IF EXISTS ix_menu_items_category_name_unique;")
