from datetime import datetime, timedelta, timezone
import hashlib
import bcrypt

from jose import JWTError, jwt


SECRET_KEY = "tasknest-development-secret-change-in-production"

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24


def _prepare_password(password: str) -> bytes:
    """
    Convert the password to SHA-256 first so bcrypt
    never receives a password longer than its 72-byte limit.
    """
    return hashlib.sha256(
        password.encode("utf-8")
    ).hexdigest().encode("utf-8")


def hash_password(password: str) -> str:
    prepared_password = _prepare_password(password)

    hashed = bcrypt.hashpw(
        prepared_password,
        bcrypt.gensalt(),
    )

    return hashed.decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    prepared_password = _prepare_password(plain_password)

    return bcrypt.checkpw(
        prepared_password,
        hashed_password.encode("utf-8"),
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