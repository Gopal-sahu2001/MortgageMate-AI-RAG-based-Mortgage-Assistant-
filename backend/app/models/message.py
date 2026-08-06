from typing import TYPE_CHECKING

from sqlalchemy import Integer, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


if TYPE_CHECKING:
    from app.models.conversation import Conversation


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    content: Mapped[str] = mapped_column(Text)

    conversation_id: Mapped[int] = mapped_column(
        ForeignKey("conversations.id")
    )

    conversation: Mapped["Conversation"] = relationship(
        back_populates="messages"
    )