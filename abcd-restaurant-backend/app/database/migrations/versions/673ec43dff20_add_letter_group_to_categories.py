"""add_letter_group_to_categories

Revision ID: 673ec43dff20
Revises: e0c5d5cbd6eb
Create Date: 2026-10-16 13:05:59.954931

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '673ec43dff20'
down_revision: Union[str, Sequence[str], None] = 'e0c5d5cbd6eb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column("categories", sa.Column("letter_group", sa.String(length=1), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column("categories", "letter_group")
