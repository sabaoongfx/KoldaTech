"""End-to-end Playwright tests for the KoldaTech onboarding flow."""

import re

from playwright.sync_api import Page, expect


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _fill_profile_step1(page: Page, name: str = "Jane Smith", profession: str = "Frontend Developer", skills: list[str] | None = None):
    """Fill out the Profile Step 1 form and click Next."""
    if skills is None:
        skills = ["React", "TypeScript"]

    page.get_by_placeholder("John Doe").fill(name)
    page.get_by_placeholder("e.g. Frontend Developer").fill(profession)

    skills_input = page.get_by_placeholder("Type a skill and press Enter")
    for skill in skills:
        skills_input.fill(skill)
        skills_input.press("Enter")

    page.get_by_role("button", name="Next", exact=True).click()


def _navigate_to_step(page: Page, step: int, name: str = "Jane Smith"):
    """Navigate from Welcome (step 0) to the given step number."""
    if step >= 1:
        # Step 0 → 1: click Get Started
        page.get_by_role("button", name="Get Started").click()
    if step >= 2:
        # Step 1 → 2: click Talent card
        page.get_by_text("Talent", exact=True).click()
    if step >= 3:
        # Step 2 → 3: fill profile step 1
        _fill_profile_step1(page, name=name)
    if step >= 4:
        # Step 3 → 4: click Next on profile step 2
        page.get_by_role("button", name="Next", exact=True).click()
    if step >= 5:
        # Step 4 → 5: click Continue
        page.get_by_role("button", name="Continue").click()
    if step >= 6:
        # Step 5 → 6: click Apply to a Job
        page.get_by_text("Apply to a Job").click()


# ---------------------------------------------------------------------------
# 1. Welcome Screen (Step 0)
# ---------------------------------------------------------------------------

class TestWelcomeScreen:
    def test_heading_visible(self, page: Page):
        expect(page.get_by_text("Welcome to")).to_be_visible()
        expect(page.get_by_text("KoldaTech")).to_be_visible()

    def test_subtext_visible(self, page: Page):
        expect(
            page.get_by_text("The digital marketplace connecting top talent")
        ).to_be_visible()

    def test_get_started_advances(self, page: Page):
        page.get_by_role("button", name="Get Started").click()
        expect(page.get_by_text("I am a...")).to_be_visible()


# ---------------------------------------------------------------------------
# 2. User Type Selection (Step 1)
# ---------------------------------------------------------------------------

class TestUserTypeScreen:
    def test_heading_visible(self, page: Page):
        _navigate_to_step(page, 1)
        expect(page.get_by_text("I am a...")).to_be_visible()

    def test_talent_card_advances(self, page: Page):
        _navigate_to_step(page, 1)
        page.get_by_text("Talent", exact=True).click()
        expect(page.get_by_text("Basic Info")).to_be_visible()

    def test_business_card_shows_coming_soon(self, page: Page):
        _navigate_to_step(page, 1)
        expect(page.get_by_text("Coming soon")).to_be_visible()
        # The business card has cursor-not-allowed and no onClick handler,
        # so clicking it should NOT advance the flow.
        business_card = page.locator(".cursor-not-allowed")
        expect(business_card).to_be_visible()
        business_card.click()
        # Should still be on step 1
        expect(page.get_by_text("I am a...")).to_be_visible()


# ---------------------------------------------------------------------------
# 3. Profile Step 1 (Step 2)
# ---------------------------------------------------------------------------

class TestProfileStep1:
    def test_progress_indicator(self, page: Page):
        _navigate_to_step(page, 2)
        expect(page.get_by_text("Step 1 of 3")).to_be_visible()
        expect(page.get_by_text("33%")).to_be_visible()

    def test_fill_inputs_and_add_skills(self, page: Page):
        _navigate_to_step(page, 2)

        page.get_by_placeholder("John Doe").fill("Test User")
        page.get_by_placeholder("e.g. Frontend Developer").fill("Designer")

        skills_input = page.get_by_placeholder("Type a skill and press Enter")
        skills_input.fill("React")
        skills_input.press("Enter")
        skills_input.fill("CSS")
        skills_input.press("Enter")

        # Badges should appear
        expect(page.get_by_text("React", exact=True)).to_be_visible()
        expect(page.get_by_text("CSS", exact=True)).to_be_visible()

    def test_duplicate_skill_prevention(self, page: Page):
        _navigate_to_step(page, 2)

        skills_input = page.get_by_placeholder("Type a skill and press Enter")
        skills_input.fill("React")
        skills_input.press("Enter")
        skills_input.fill("React")
        skills_input.press("Enter")

        # Should only have one React badge
        badges = page.locator("[data-slot='badge']", has_text="React")
        expect(badges).to_have_count(1)

    def test_remove_skill(self, page: Page):
        _navigate_to_step(page, 2)

        skills_input = page.get_by_placeholder("Type a skill and press Enter")
        skills_input.fill("React")
        skills_input.press("Enter")
        skills_input.fill("CSS")
        skills_input.press("Enter")

        # Remove React by clicking its X button
        react_badge = page.locator("[data-slot='badge']", has_text="React")
        react_badge.locator("button").click()

        expect(page.locator("[data-slot='badge']", has_text="React")).to_have_count(0)
        expect(page.locator("[data-slot='badge']", has_text="CSS")).to_have_count(1)

    def test_next_button_disabled_when_empty(self, page: Page):
        _navigate_to_step(page, 2)
        expect(page.get_by_role("button", name="Next", exact=True)).to_be_disabled()

    def test_next_button_enabled_when_valid(self, page: Page):
        _navigate_to_step(page, 2)

        page.get_by_placeholder("John Doe").fill("Test User")
        page.get_by_placeholder("e.g. Frontend Developer").fill("Developer")
        skills_input = page.get_by_placeholder("Type a skill and press Enter")
        skills_input.fill("JS")
        skills_input.press("Enter")

        expect(page.get_by_role("button", name="Next", exact=True)).to_be_enabled()

    def test_next_advances_to_step3(self, page: Page):
        _navigate_to_step(page, 2)
        _fill_profile_step1(page)
        expect(page.get_by_text("Step 2 of 3")).to_be_visible()


# ---------------------------------------------------------------------------
# 4. Profile Step 2 (Step 3)
# ---------------------------------------------------------------------------

class TestProfileStep2:
    def test_progress_indicator(self, page: Page):
        _navigate_to_step(page, 3)
        expect(page.get_by_text("Step 2 of 3")).to_be_visible()
        expect(page.get_by_text("66%")).to_be_visible()

    def test_experience_textarea(self, page: Page):
        _navigate_to_step(page, 3)
        textarea = page.get_by_placeholder(
            "Tell us about your professional experience"
        )
        expect(textarea).to_be_visible()
        textarea.fill("5 years of experience in web development")

    def test_portfolio_upload_zone(self, page: Page):
        _navigate_to_step(page, 3)
        expect(page.get_by_text("Drag & drop files here")).to_be_visible()
        expect(page.get_by_text("or click to browse")).to_be_visible()

    def test_motivational_text(self, page: Page):
        _navigate_to_step(page, 3)
        expect(
            page.get_by_text("Adding these details increases your chances")
        ).to_be_visible()

    def test_next_advances_to_step4(self, page: Page):
        _navigate_to_step(page, 3)
        page.get_by_role("button", name="Next", exact=True).click()
        expect(page.get_by_text("Your profile is complete!")).to_be_visible()


# ---------------------------------------------------------------------------
# 5. Profile Complete (Step 4)
# ---------------------------------------------------------------------------

class TestProfileComplete:
    def test_progress_100(self, page: Page):
        _navigate_to_step(page, 4)
        expect(page.get_by_text("Step 3 of 3")).to_be_visible()
        expect(page.get_by_text("100%")).to_be_visible()

    def test_completion_message(self, page: Page):
        _navigate_to_step(page, 4)
        expect(page.get_by_text("Your profile is complete!")).to_be_visible()

    def test_badge_xp_prompt(self, page: Page):
        _navigate_to_step(page, 4)
        expect(page.get_by_text("Earn your first badge!")).to_be_visible()
        expect(page.get_by_text("+50 XP")).to_be_visible()

    def test_continue_advances_to_step5(self, page: Page):
        _navigate_to_step(page, 4)
        page.get_by_role("button", name="Continue").click()
        expect(page.get_by_text("Ready to get started?")).to_be_visible()


# ---------------------------------------------------------------------------
# 6. First Action (Step 5)
# ---------------------------------------------------------------------------

class TestFirstActionScreen:
    def test_heading_visible(self, page: Page):
        _navigate_to_step(page, 5)
        expect(page.get_by_text("Ready to get started?")).to_be_visible()

    def test_all_action_cards_visible(self, page: Page):
        _navigate_to_step(page, 5)
        expect(page.get_by_text("Apply to a Job")).to_be_visible()
        expect(page.get_by_text("Post a Service")).to_be_visible()
        expect(page.get_by_text("Contact a Professional")).to_be_visible()

    def test_apply_to_job_advances(self, page: Page):
        _navigate_to_step(page, 5)
        page.get_by_text("Apply to a Job").click()
        # Should be on dashboard (step 6) now
        expect(page.get_by_text("You've taken your first step")).to_be_visible()


# ---------------------------------------------------------------------------
# 7. Dashboard (Step 6)
# ---------------------------------------------------------------------------

class TestDashboardScreen:
    def test_personalized_greeting(self, page: Page):
        _navigate_to_step(page, 6, name="Jane Smith")
        expect(page.get_by_text("Great, Jane!")).to_be_visible()

    def test_profile_completion_card(self, page: Page):
        _navigate_to_step(page, 6)
        expect(page.get_by_text("Profile Completion")).to_be_visible()
        expect(page.get_by_text("75%").first).to_be_visible()

    def test_suggested_jobs(self, page: Page):
        _navigate_to_step(page, 6)
        expect(page.get_by_text("Suggested Jobs")).to_be_visible()
        expect(page.get_by_text("Senior React Developer")).to_be_visible()
        expect(page.get_by_text("UI/UX Designer")).to_be_visible()
        expect(page.get_by_text("Full Stack Engineer")).to_be_visible()

    def test_quick_tips(self, page: Page):
        _navigate_to_step(page, 6)
        expect(page.get_by_text("Quick Tips")).to_be_visible()
        expect(
            page.get_by_text("Complete your skill assessments to rank higher")
        ).to_be_visible()

    def test_go_to_dashboard_button(self, page: Page):
        _navigate_to_step(page, 6)
        expect(
            page.get_by_role("button", name="Go to Dashboard")
        ).to_be_visible()


# ---------------------------------------------------------------------------
# 8. Full Flow E2E
# ---------------------------------------------------------------------------

class TestFullFlowE2E:
    def test_complete_flow_with_data(self, page: Page):
        """Walk through the entire onboarding flow and verify the name appears
        on the dashboard at the end."""

        # Step 0 – Welcome
        expect(page.get_by_text("Welcome to")).to_be_visible()
        page.get_by_role("button", name="Get Started").click()

        # Step 1 – User Type
        expect(page.get_by_text("I am a...")).to_be_visible()
        page.get_by_text("Talent", exact=True).click()

        # Step 2 – Profile Step 1
        expect(page.get_by_text("Basic Info")).to_be_visible()
        page.get_by_placeholder("John Doe").fill("Alex Johnson")
        page.get_by_placeholder("e.g. Frontend Developer").fill("Full Stack Developer")
        skills_input = page.get_by_placeholder("Type a skill and press Enter")
        for skill in ["Python", "React", "Docker"]:
            skills_input.fill(skill)
            skills_input.press("Enter")
        page.get_by_role("button", name="Next", exact=True).click()

        # Step 3 – Profile Step 2
        expect(page.get_by_text("Details & Portfolio")).to_be_visible()
        page.get_by_placeholder(
            "Tell us about your professional experience"
        ).fill("10 years building web applications")
        page.get_by_role("button", name="Next", exact=True).click()

        # Step 4 – Profile Complete
        expect(page.get_by_text("Your profile is complete!")).to_be_visible()
        page.get_by_role("button", name="Continue").click()

        # Step 5 – First Action
        expect(page.get_by_text("Ready to get started?")).to_be_visible()
        page.get_by_text("Apply to a Job").click()

        # Step 6 – Dashboard
        expect(page.get_by_text("Great, Alex!")).to_be_visible()
        expect(page.get_by_text("Suggested Jobs")).to_be_visible()
        expect(
            page.get_by_role("button", name="Go to Dashboard")
        ).to_be_visible()
