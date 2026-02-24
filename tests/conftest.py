"""Shared fixtures for Playwright onboarding tests."""

import subprocess
import time
import socket
import signal
import shutil
import os

import pytest
from playwright.sync_api import sync_playwright, Page


DEV_SERVER_PORT = int(os.environ.get("TEST_PORT", "3000"))
DEV_SERVER_URL = f"http://localhost:{DEV_SERVER_PORT}"


def _port_is_open(port: int, host: str = "localhost", timeout: float = 1.0) -> bool:
    """Check whether *host:port* accepts TCP connections."""
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except OSError:
        return False


@pytest.fixture(scope="session")
def dev_server():
    """Start the Next.js dev server once for the entire test session.

    If a server is already listening on the configured port, re-use it.
    Otherwise, remove any stale lock file and start a fresh server.
    """
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # If the port is already in use, assume the server is running externally.
    if _port_is_open(DEV_SERVER_PORT):
        yield DEV_SERVER_URL
        return

    # Remove stale Next.js dev lock to avoid "is another instance running?" error.
    lock_path = os.path.join(project_root, ".next", "dev", "lock")
    if os.path.exists(lock_path):
        os.remove(lock_path)

    proc = subprocess.Popen(
        f"npx next dev --port {DEV_SERVER_PORT}",
        cwd=project_root,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        shell=True,
        creationflags=(subprocess.CREATE_NEW_PROCESS_GROUP if os.name == "nt" else 0),
    )

    # Wait up to 60 seconds for the dev server to become reachable.
    for _ in range(120):
        if _port_is_open(DEV_SERVER_PORT):
            break
        time.sleep(0.5)
    else:
        proc.terminate()
        raise RuntimeError(
            f"Next.js dev server did not start on port {DEV_SERVER_PORT} in time"
        )

    yield DEV_SERVER_URL

    # Teardown: stop the dev server.
    if os.name == "nt":
        subprocess.run(
            f"taskkill /F /T /PID {proc.pid}",
            shell=True,
            capture_output=True,
        )
    else:
        proc.terminate()
        proc.wait(timeout=10)


@pytest.fixture(scope="session")
def browser(dev_server):
    """Launch a single Chromium browser for the session."""
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        yield browser
        browser.close()


@pytest.fixture()
def page(browser, dev_server) -> Page:
    """Provide a fresh page (tab) for each test, navigated to the app root."""
    context = browser.new_context()
    pg = context.new_page()
    pg.goto(dev_server, wait_until="networkidle")
    yield pg
    context.close()
