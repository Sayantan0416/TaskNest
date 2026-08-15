from datetime import datetime, timedelta, timezone
import hashlib

from jose import JWTError, jwt
from passlib.context import CryptContext


SECRET_KEY = "tasknest-development-secret-change-in-production"

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)


def _prepare_password(password: str) -> str:
    # Always convert the user's password to a fixed 64-character
    # SHA-256 hexadecimal string before bcrypt sees it.
    return hashlib.sha256(
        password.encode("utf-8")
    ).hexdigest()


def hash_password(password: str) -> str:
    prepared_password = _prepare_password(password)
    return pwd_context.hash(prepared_password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    prepared_password = _prepare_password(plain_password)

    return pwd_context.verify(
        prepared_password,
        hashed_password,
    )


def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None,
) -> str:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def decode_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            return None

        return int(user_id)

    except (JWTError, ValueError, TypeError):
        return None