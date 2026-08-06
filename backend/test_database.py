from app.core.database import SessionLocal

from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message


db = SessionLocal()


try:

    # Create user
    user = User(
        name="Gopal",
        email="gopal@test.com"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    print("✅ User created:", user.id)


    # Create conversation
    conversation = Conversation(
        title="Mortgage Eligibility Check",
        user_id=user.id
    )

    db.add(conversation)
    db.commit()
    db.refresh(conversation)

    print("✅ Conversation created:", conversation.id)


    # Create messages
    message1 = Message(
        content="Can I get a mortgage loan?",
        conversation_id=conversation.id
    )

    message2 = Message(
        content="Based on your income, you may qualify.",
        conversation_id=conversation.id
    )


    db.add_all([message1, message2])
    db.commit()


    print("✅ Messages created")


finally:
    db.close()