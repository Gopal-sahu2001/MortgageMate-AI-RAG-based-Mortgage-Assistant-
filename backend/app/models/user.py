from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.conversation import Conversation


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer, 
        primary_key=True,
        index=True)

    name: Mapped[str] = mapped_column(
        String(100)
        )

    email: Mapped[str] = mapped_column(
        String(255), 
        unique=True, 
        index=True
        )

    conversations = relationship(
    "Conversation",
    back_populates="user",
    cascade="all, delete-orphan"
    )