"""add_operational_controls_to_global_settings

Revision ID: e0c5d5cbd6eb
Revises: 62cf8d1f0b64
Create Date: 2026-10-16 10:20:18.103493

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e0c5d5cbd6eb'
down_revision: Union[str, Sequence[str], None] = '62cf8d1f0b64'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('global_settings', sa.Column('is_online_ordering_enabled', sa.Boolean(), nullable=False, server_default=sa.text('false')))
    op.add_column('global_settings', sa.Column('is_table_reservation_enabled', sa.Boolean(), nullable=False, server_default=sa.text('true')))


def downgrade() -> None:
    op.drop_column('global_settings', 'is_table_reservation_enabled')
    op.drop_column('global_settings', 'is_online_ordering_enabled')
